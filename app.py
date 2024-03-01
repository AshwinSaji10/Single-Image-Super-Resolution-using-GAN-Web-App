from flask import Flask, jsonify,request
from flask_cors import CORS
from PIL import Image
import numpy as np
import cv2
import tensorflow as tf
import sys
# from keras.models import load_model
from keras import Model
from keras.layers import Input,Conv2D, PReLU,BatchNormalization,UpSampling2D,add
import io
# import os
from base64 import b64encode
from json import dumps

def res_block(ip):

    res_model = Conv2D(64, (3,3), padding = "same")(ip)
    res_model = BatchNormalization(momentum = 0.5)(res_model)
    res_model = PReLU(shared_axes = [1,2])(res_model)

    res_model = Conv2D(64, (3,3), padding = "same")(res_model)
    res_model = BatchNormalization(momentum = 0.5)(res_model)

    return add([ip,res_model])

def upscale_block(ip):

    up_model = Conv2D(256, (3,3), padding="same")(ip)
    up_model = UpSampling2D( size = 2 )(up_model)
    up_model = PReLU(shared_axes=[1,2])(up_model)

    return up_model

def create_gen(gen_ip, num_res_block):
    layers = Conv2D(64, (9,9), padding="same")(gen_ip)
    layers = PReLU(shared_axes=[1,2])(layers)

    temp = layers

    for i in range(num_res_block):
        layers = res_block(layers)

    layers = Conv2D(64, (3,3), padding="same")(layers)
    layers = BatchNormalization(momentum=0.5)(layers)
    layers = add([layers,temp])

    layers = upscale_block(layers)
    layers = upscale_block(layers)

    op = Conv2D(3, (9,9), padding="same")(layers)

    return Model(inputs=gen_ip, outputs=op)


app = Flask(__name__)
CORS(app)

# Load your model
# model = load_model('./models/gen_e_60.h5')

@app.route('/image', methods=['POST'])
def upload_image():
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'})

    file = request.files['file']

    print('Hello world!', file=sys.stderr)

    img = Image.open(file)
    img = img.convert("RGB")

    im_x,im_y=img.size
    print("size =",im_x,im_y)
    # im_x=128
    # im_y=128
    
    # file_data = file.read()

    # nparr = np.frombuffer(file_data, np.uint8)

    # img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # img = img.resize((32, 32))
    # X2 = img


    # im_y,im_x=img.shape
    lr_ip = Input(shape=(im_x,im_y,3))
    generator = create_gen(lr_ip, num_res_block = 16)
    generator.summary()


    img=np.array(img)
    # img = img[:, :, ::-1].copy()
    X1 = cv2.resize(img,(im_x,im_y), interpolation = cv2.INTER_AREA)
    X = np.reshape(X1, (1,im_x,im_y, 3))
    X_batch = tf.cast(X, tf.float32)


    generator.load_weights('./models/gen_e_60.h5')
    Y = generator(X_batch/255)

    # img_array = np.array(img) / 255.0
    # img_array = np.expand_dims(img_array, axis=0)

    
    # print(f"array shape : {np.array(img_array).shape}")

    # prediction = model.predict(img_array)
    output=Y[0] * 255
    processed_image = Image.fromarray((np.clip(output, 0, 255).astype(np.uint8)).astype(np.uint8))

    img_bytes = io.BytesIO()

    processed_image.save(img_bytes, format='PNG')

    base64_bytes = b64encode(img_bytes.getvalue())

    base64_string = base64_bytes.decode('utf-8')

    raw_data = {'image': base64_string}

    json_data = dumps(raw_data, indent=2)

    return json_data
    

    """Code to Just display a random image
    # img=Image.open("sample.png")
  
    # img_bytes = io.BytesIO()
    # img.save(img_bytes, "png")

    # base64_bytes = b64encode(img_bytes.getvalue())

    # # third: decode these bytes to text
    # # result: string (in utf-8)
    # base64_string = base64_bytes.decode('utf-8')

    # # optional: doing stuff with the data
    # # result here: some dict
    # raw_data = {'image': base64_string}

    # # now: encoding the data to json
    # # result: string
    # json_data = dumps(raw_data, indent=2)
    
    # return json_data
    # # return {'image' : 'sdfsdf'}
    """
if __name__ == '__main__':
    app.run(debug=True)



