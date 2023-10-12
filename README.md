# Spark On-Ramp  

This repo contains code for app that allows users deposit to Spark Protocol with web2 login and credit card payment only.


# Deploy Factory contract# 

 forge create --rpc-url <your_rpc_url> \
    --constructor-args 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789 0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844 0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C \
    --private-key <your_private_key> \
    --etherscan-api-key <your_etherscan_api_key> \
    --verify \
    src/SparkAccountFactory.sol:SparkAccountFactory