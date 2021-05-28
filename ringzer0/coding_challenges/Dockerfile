# set base image (host OS)
FROM python:3.9

# set the working directory in the container
WORKDIR /usr

# copy the dependencies file to the working directory
COPY requirements.txt .

RUN apt-get update && \
apt-get install -y software-properties-common && \
rm -rf /var/lib/apt/lists/* 

# install google ocr
RUN add-apt-repository -r ppa:alex-p/tesseract-ocr-devel && \
apt-get update && \
apt-get install -y tesseract-ocr

#Install Enchant C Library
RUN apt-get update && apt-get -y install libenchant1c2a

# install dependencies
RUN apt-get update && apt-get install -y wamerican

RUN pip install -r requirements.txt

RUN git clone https://github.com/domanchi/gibberish-detector.git /usr/src/ringzer0/gibberish && \ 
cd /usr/src/ringzer0/gibberish && \
gibberish-detector train examples/big.txt > ../big.model

# copy the content of the local src directory to the working directory
COPY src/ ./usr/src/

# command to run on container start
CMD ["python", "/usr/dev/ringzer0/coding_challenges/src/main.py"]