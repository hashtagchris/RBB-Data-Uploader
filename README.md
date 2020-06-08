# RBB-data-uploader

### Getting started
1. Make a copy of the `.env.example` file.  Rename the copy to `.env`
1. Make a clone of the existing airtable base from production
1. Fill in the two missing pieces of information in the `.env` file.  They should be the intended Airtable base (the one you just created) and your personal API Key.

1. From the root of the directory run each of the commands below

```
npm i
npm install -g .
upload-data -t Businesses
```

This will allow you to use the `upload-data` command from your terminal.
