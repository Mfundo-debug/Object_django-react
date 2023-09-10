import cv2
import numpy as np
import os

# set the path to the gestures folder
path = "C:/Users/didit/OneDrive/Desktop/Object_django-react/conference_registration/datasets/gestures"

# loop through all the images in the folder
for filename in os.listdir(path):
    # load the image
    image = cv2.imread(os.path.join(path, filename))
    # resize the image to 224x224 pixels
    image = cv2.resize(image, (224, 224))
    # normalize pixel values to [0,1]
    image = image.astype(np.float32) / 255.0
    # do something with the normalized image
    # ...

