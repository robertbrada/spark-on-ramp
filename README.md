# Spark On-Ramp  

This repo contains code for app that allows users deposit to Spark Protocol with social login and credit card payment.

Check this demo video to see it in action: https://www.loom.com/share/6ec272d2360d4c8e962f634a942b183c?sid=12e0382e-8b24-41d1-a958-fa749a1426f2

## Run the web app locally

All the necessary contracts are deployed on Goerli so no need to deploy any contracts.
The app is using Alchemy's [Simple Account Factory](https://docs.alchemy.com/reference/simple-account-factory-addresses) as a smart contract wallet.

- Clone the repo: `git clone https://github.com/robertbrada/spark-on-ramp.git`
- Go to the project folder: `cd spark-on-ramp`
- Go to the `web` folder: `cd web`
- Create `.env` file `cp .env.example .env`
- Fill in the environment variables (see the comments in .env file)
- Install dependencies: `yarn`
- Run the app: `yarn dev`

