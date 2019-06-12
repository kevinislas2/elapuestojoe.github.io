import os

assetFolder = "./assets"

for filename in os.listdir(assetFolder):
    command = "cwebp {}/{} -o {}/{}".format(assetFolder, filename, assetFolder, filename.split(".")[0] + ".webp")
    os.system(command)

