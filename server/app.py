from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import tensorflow as tf

app = Flask(__name__)

# Load your .h5 model
model = tf.keras.models.load_model('C:\Users\rashp\Downloads\vgg16_cancer_model (1)')  # Update with your actual path

def preprocess_image(image, target_size=(224, 224)):
    image = image.resize(target_size)
    image = image.convert('RGB')
    img_array = np.array(image) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/api/predict', methods=['POST'])
def predict():
    file = request.files['image']
    img = Image.open(file.stream)
    processed_img = preprocess_image(img)
    prediction = model.predict(processed_img)
    # Example: If your model outputs probabilities for two classes
    pred_class = np.argmax(prediction, axis=1)[0]
    confidence = float(np.max(prediction))
    label = 'benign' if pred_class == 0 else 'malignant'
    return jsonify({'prediction': label, 'confidence': confidence})

if __name__ == '__main__':
    app.run(debug=True)