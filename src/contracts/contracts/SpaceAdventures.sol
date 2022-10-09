// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;
pragma experimental ABIEncoderV2;

import "../node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "../node_modules/@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../node_modules/@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "../node_modules/@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract SpaceAdventures is ERC721Upgradeable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;
    mapping(uint256 => TokenMeta) private _tokenMeta;

    string baseURI;

    struct TokenMeta {
        uint256 id;
        uint256 price;
        string name;
        string uri;
        bool isOnSale;
    }

    function initialize() public initializer {
        OwnableUpgradeable.__Ownable_init();
        ReentrancyGuardUpgradeable.__ReentrancyGuard_init();
        ERC721Upgradeable.__ERC721_init("War Alpha Adventures", "WA-A");
        setBaseURI("https://waralpha.io/adventures/");
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public virtual onlyOwner {
        baseURI = _newBaseURI;
    }

    function getAllOnSale() public view virtual returns (TokenMeta[] memory) {
        TokenMeta[] memory tokensOnSale = new TokenMeta[](_tokenIds.current());
        uint256 counter = 0;
        for (uint256 i = 1; i < _tokenIds.current() + 1; i++) {
            if (_tokenMeta[i].isOnSale == true) {
                tokensOnSale[counter] = _tokenMeta[i];
                counter++;
            }
        }
        return tokensOnSale;
    }

    function setTokenSale(
        uint256 _tokenId,
        bool _isOnSale,
        uint256 _price
    ) public {
        require(_exists(_tokenId), "ERC721Metadata: Sale set of nonexistent token");
        require(_price > 0);
        require(ownerOf(_tokenId) == _msgSender());
        _tokenMeta[_tokenId].isOnSale = _isOnSale;
        setTokenPrice(_tokenId, _price);
    }

    function setTokenPrice(uint256 _tokenId, uint256 _price) public {
        require(_exists(_tokenId), "ERC721Metadata: Price set of nonexistent token");
        require(ownerOf(_tokenId) == _msgSender());
        _tokenMeta[_tokenId].price = _price;
    }

    function tokenPrice(uint256 tokenId) public view virtual returns (uint256) {
        require(_exists(tokenId), "ERC721Metadata: Price query for nonexistent token");
        return _tokenMeta[tokenId].price;
    }

    function _setTokenMeta(uint256 _tokenId, TokenMeta memory _meta) private {
        require(_exists(_tokenId));
        require(ownerOf(_tokenId) == _msgSender());
        _tokenMeta[_tokenId] = _meta;
    }

    function tokenMeta(uint256 _tokenId) public view returns (TokenMeta memory) {
        require(_exists(_tokenId));
        return _tokenMeta[_tokenId];
    }

    function purchaseToken(uint256 _tokenId) public payable nonReentrant {
        require(msg.sender != address(0) && msg.sender != ownerOf(_tokenId));
        require(msg.value >= _tokenMeta[_tokenId].price);
        address tokenSeller = ownerOf(_tokenId);
        payable(tokenSeller).transfer(msg.value);
        setApprovalForAll(tokenSeller, true);
        _transfer(tokenSeller, msg.sender, _tokenId);
        _tokenMeta[_tokenId].isOnSale = false;
    }

    function mintCollectable(
        address _owner,
        string memory _tokenURI,
        string memory _name,
        uint256 _price,
        bool _isOnSale
    ) public onlyOwner returns (uint256) {
        require(_price > 0);
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_owner, newItemId);
        TokenMeta memory meta = TokenMeta(newItemId, _price, _name, _tokenURI, _isOnSale);
        _setTokenMeta(newItemId, meta);
        return newItemId;
    }
}
