// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

/* solhint-disable avoid-low-level-calls */
/* solhint-disable no-inline-assembly */
/* solhint-disable reason-string */

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";

import "@eth-infinitism/contracts/core/BaseAccount.sol";

import "./interfaces/ISavingsDai.sol";
import "./interfaces/IDai.sol";

/**
  * minimal account.
  *  this is sample minimal account.
  *  has execute, eth handling methods
  *  has a single signer that can send requests through the entryPoint.
  */
contract SparkAccount is BaseAccount, UUPSUpgradeable, Initializable {
    using ECDSA for bytes32;

    address public owner;
    // address public whitelistDeployer = 0x5ce94852EE993eF3ef248ad518e5473a31Cfc109; // address that is allowed to deploy contract on behalf of user
    address public whitelistExecutor = 0xb3Ad8A7d9279b1a209B96fDCC2BA65e58e86D5fe; // address that is allowed to deploy contract on behalf of user

    IEntryPoint private immutable _entryPoint;
    ISavingsDai private _savingsDai; 
    IDai private _dai;

    // These are Goerli testnet addresses
    // Do not hardcode these addresses here, better set in contructor 
    // address public constant DAI_ADDRESS = 0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844;
    // address public constant SDAI_ADDRESS = 0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C;

    event SimpleAccountInitialized(IEntryPoint indexed entryPoint, IDai dai, ISavingsDai savingsDai ,address indexed owner);

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    /// @inheritdoc BaseAccount
    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }


    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}

    event ContructorCalled(bool _value);
    event BalanceReceived(address indexed _from, uint _value);
    event BalanceApproved(address indexed _from, uint _value, bool _success);
    event ContractsInitialized(address indexed _entryPoint, address indexed _dai, address indexed _savingsDai);
    event Deposit(address indexed _from, uint _value);

    constructor(IEntryPoint anEntryPoint, IDai dai, ISavingsDai savingsDai) {
        emit ContructorCalled(true);

        // This contract should be deployed only after the address where it'll be deployed has recevied some DAI
        _entryPoint = anEntryPoint;
        _dai = dai;
        _savingsDai = savingsDai;
        emit ContractsInitialized(address(anEntryPoint), address(dai), address(savingsDai));

        // // Approve Spark Protocol (= sDAI) spend user's DAI
        // uint256 daiBalance = dai.balanceOf(address(this));
        // emit BalanceReceived(address(this), daiBalance);

        // // bool approved = _dai.approve(address(_savingsDai), daiBalance); // use "type(uint256).max" to approve max possible amount
        // bool approved  = dai.approve(address(savingsDai), type(uint256).max); // use "type(uint256).max" to approve max possible amount
        // emit BalanceApproved(address(this), daiBalance, approved);

        // // require(approved, 'Approval to spend DAI by sDAI failed');

        // // Once approved deposit DAI to Spark Protocol
        // _savingsDai.deposit(daiBalance, address(this));
        // emit Deposit(address(this), daiBalance);

        depositToSpark();
        _disableInitializers();
    }

    function _onlyOwner() internal view {
        //directly from EOA owner, or through the account itself (which gets redirected through execute())
        require(msg.sender == owner || msg.sender == address(this), "only owner");
    }

    /**
     * execute a transaction (called directly from owner, or by entryPoint)
     */
    function execute(address dest, uint256 value, bytes calldata func) external {
        _requireFromEntryPointOrOwner();
        _call(dest, value, func);
    }

    /**
     * execute a sequence of transactions
     */
    function executeBatch(address[] calldata dest, bytes[] calldata func) external {
        _requireFromEntryPointOrOwner();
        require(dest.length == func.length, "wrong array lengths");
        for (uint256 i = 0; i < dest.length; i++) {
            _call(dest[i], 0, func[i]);
        }
    }

    /**
     * @dev The _entryPoint member is immutable, to reduce gas consumption.  To upgrade EntryPoint,
     * a new implementation of SimpleAccount must be deployed with the new EntryPoint address, then upgrading
      * the implementation by calling `upgradeTo()`
     */
    function initialize(address anOwner) public virtual initializer {
        _initialize(anOwner);
        //    // Approve Spark Protocol (= sDAI) spend user's DAI
        // uint256 daiBalance = _dai.balanceOf(address(this));
        // emit BalanceReceived(address(this), daiBalance);

        // bool approved = _dai.approve(address(_savingsDai), daiBalance); // use "type(uint256).max" to approve max possible amount
        // bool approved  = _dai.approve(address(_savingsDai), type(uint256).max); // use "type(uint256).max" to approve max possible amount
        // emit BalanceApproved(address(this), daiBalance, approved);

        // require(approved, 'Approval to spend DAI by sDAI failed');

        // Once approved deposit DAI to Spark Protocol
        // _savingsDai.deposit(daiBalance, address(this));
        // emit Deposit(address(this), daiBalance);
    }
 
    function _initialize(address anOwner) internal virtual {
        owner = anOwner;
        emit SimpleAccountInitialized(_entryPoint, _dai, _savingsDai, owner);

        // Approve Spark Protocol (= sDAI) spend user's DAI
        // uint256 daiBalance = _dai.balanceOf(address(this));
        // emit BalanceReceived(address(this), daiBalance);
    }

    // Require the function call went through EntryPoint or owner
    function _requireFromEntryPointOrOwner() internal view {
        require(msg.sender == address(entryPoint()) || msg.sender == owner, "account: not Owner or EntryPoint");
    }

    /// implement template method of BaseAccount
    /* UserOperation: 
    {
        address sender;
        uint256 nonce;
        bytes initCode; // first 20 bytes is factory address
        bytes callData; // 
        uint256 callGasLimit;
        uint256 verificationGasLimit;
        uint256 preVerificationGas;
        uint256 maxFeePerGas;
        uint256 maxPriorityFeePerGas;
        bytes paymasterAndData;
        bytes signature;
    }
     */
    function _validateSignature(UserOperation calldata userOp, bytes32 userOpHash)
    internal override virtual returns (uint256 validationData) {
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        // if (owner != hash.recover(userOp.signature))
        address userOpSigner = hash.recover(userOp.signature);
        if (owner != userOpSigner || whitelistExecutor != userOpSigner)
            return SIG_VALIDATION_FAILED;
        return 0;
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value : value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    /**
     * check current account deposit in the entryPoint
     */
    function getDeposit() public view returns (uint256) {
        return entryPoint().balanceOf(address(this));
    }

    /**
     * deposit more funds for this account in the entryPoint
     */
    function addDeposit() public payable {
        entryPoint().depositTo{value : msg.value}(address(this));
    }

    /**
     * withdraw value from the account's deposit
     * @param withdrawAddress target to send to
     * @param amount to withdraw
     */
    function withdrawDepositTo(address payable withdrawAddress, uint256 amount) public onlyOwner {
        entryPoint().withdrawTo(withdrawAddress, amount);
    }

    function _authorizeUpgrade(address newImplementation) internal view override {
        (newImplementation);
        _onlyOwner();
    }

    function depositToSpark() public {
        // Approve Spark Protocol (= sDAI) spend user's DAI
        uint256 daiBalance = _dai.balanceOf(address(this));
        emit BalanceReceived(address(this), daiBalance);

        // bool approved = _dai.approve(address(_savingsDai), daiBalance); // use "type(uint256).max" to approve max possible amount
        bool approved  = _dai.approve(address(_savingsDai), type(uint256).max); // use "type(uint256).max" to approve max possible amount
        emit BalanceApproved(address(this), daiBalance, approved);

        require(approved, 'Approval to spend DAI by sDAI failed');

        // Once approved deposit DAI to Spark Protocol
        _savingsDai.deposit(daiBalance, address(this));
        emit Deposit(address(this), daiBalance);
    }
}