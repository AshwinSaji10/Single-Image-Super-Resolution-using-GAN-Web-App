import generator
from flask import Flask, jsonify,request
from flask_cors import CORS
from PIL import Image
import numpy as np
# import h5py
# import tensorflow as tf
from keras.models import load_model
import io
# import os
from base64 import b64encode
from json import dumps

app = Flask(__name__)
CORS(app)

# Load your model
model = load_model('./models/gen_e_60.h5')

@app.route('/image', methods=['POST'])
def upload_image():
    # if request.method == 'OPTIONS':
    #     response = jsonify({'message': 'Preflight request successful'})
    #     response.headers.add('Access-Control-Allow-Methods', 'POST')
    #     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    #     return response
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'})

    file = request.files['file']
  
    img = Image.open(file)

    # img_bytes = img_bytes.getvalue()
    img = img.resize((32, 32))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    
    # print(f"array shape : {np.array(img_array).shape}")

    prediction = model.predict(img_array)
    output=prediction[0] * 255
    processed_image = Image.fromarray((np.clip(output, 0, 255).astype(np.uint8)).astype(np.uint8))
    img_bytes = io.BytesIO()
    processed_image.save(img_bytes, format='PNG')
    base64_bytes = b64encode(img_bytes.getvalue())
    base64_string = base64_bytes.decode('utf-8')
    raw_data = {'image': base64_string}
    json_data = dumps(raw_data, indent=2)
    return json_data
    # #return jsonify({'image': img_bytes.decode('ISO-8859-1')})
    

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



