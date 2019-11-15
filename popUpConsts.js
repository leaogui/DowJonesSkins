const popUpDeposito = '<link rel="stylesheet" href="../css/popUpGreen.css" defer>\
<div id="myModal" class="modal">\
    <!-- Modal content -->\
    <div class="modal-content">\
        <div class="modal-header">\
        <span class="close">&times;</span>\
        <h2>Deposito da Carteira</h2>\
        </div>\
        <div class="modal-body">\
        <p>R$15,00 Depositados com Sucesso!</p>\
        </div>\
        <div class="modal-footer">\
        </div>\
    </div>\
</div>\
<script defer src="../JS/scripts/popUp.js"></script>'

const popUpSaqueGreen = '<link rel="stylesheet" href="../css/popUpGreen.css" defer>\
<div id="myModal" class="modal">\
    <!-- Modal content -->\
    <div class="modal-content">\
        <div class="modal-header">\
        <span class="close">&times;</span>\
        <h2>Retirada da Carteira</h2>\
        </div>\
        <div class="modal-body">\
        <p>Saque Realizado com Sucesso!</p>\
        </div>\
        <div class="modal-footer">\
        </div>\
    </div>\
</div>\
<script defer src="../JS/scripts/popUp.js"></script>'

const popUpSaqueRed = '<link rel="stylesheet" href="../css/popUpRed.css" defer>\
<div id="myModal" class="modal">\
    <!-- Modal content -->\
    <div class="modal-content">\
        <div class="modal-header">\
        <span class="close">&times;</span>\
        <h2>Retirada da Carteira</h2>\
        </div>\
        <div class="modal-body">\
        <p>Saldo Insuficiente!</p>\
        </div>\
        <div class="modal-footer">\
        </div>\
    </div>\
</div>\
<script defer src="../JS/scripts/popUp.js"></script>'

const popUpCompraGreen = '<link rel="stylesheet" href="../css/popUpGreen.css" defer>\
<div id="myModal" class="modal">\
    <!-- Modal content -->\
    <div class="modal-content">\
        <div class="modal-header">\
        <span class="close">&times;</span>\
        <h2>Compra de Skin</h2>\
        </div>\
        <div class="modal-body">\
        <p>Compra Realizada com Sucesso!</p>\
        </div>\
        <div class="modal-footer">\
        </div>\
    </div>\
</div>\
<script defer src="../JS/scripts/popUp.js"></script>'

const popUpCompraRed = '<link rel="stylesheet" href="../css/popUpRed.css" defer>\
<div id="myModal" class="modal">\
    <!-- Modal content -->\
    <div class="modal-content">\
        <div class="modal-header">\
        <span class="close">&times;</span>\
        <h2>Compra de Skin</h2>\
        </div>\
        <div class="modal-body">\
        <p>Saldo Insuficiente!</p>\
        </div>\
        </div>\
    </div>\
</div>\
<script defer src="../JS/scripts/popUp.js"></script>'

const popUpInvestimento = '<link rel="stylesheet" href="../css/popUpGreen.css" defer>\
<div id="myModal" class="modal">\
    <!-- Modal content -->\
    <div class="modal-content">\
        <div class="modal-header">\
        <span class="close">&times;</span>\
        <h2>Investimento</h2>\
        </div>\
        <div class="modal-body">\
        <p>Investimento Realizado com Sucesso!</p>\
        </div>\
        <div class="modal-footer">\
        </div>\
    </div>\
</div>\
<script defer src="../JS/scripts/popUp.js"></script>'

const popUpRetirarInvestimento = '<link rel="stylesheet" href="../css/popUpGreen.css" defer>\
<div id="myModal" class="modal">\
    <!-- Modal content -->\
    <div class="modal-content">\
        <div class="modal-header">\
        <span class="close">&times;</span>\
        <h2>Investimento</h2>\
        </div>\
        <div class="modal-body">\
        <p>Investimento Cancelado com Sucesso!</p>\
        </div>\
        <div class="modal-footer">\
        </div>\
    </div>\
</div>\
<script defer src="../JS/scripts/popUp.js"></script>'

const popUpSacarSkin = '<link rel="stylesheet" href="../css/popUpGreen.css" defer>\
<div id="myModal" class="modal">\
    <!-- Modal content -->\
    <div class="modal-content">\
        <div class="modal-header">\
        <span class="close">&times;</span>\
        <h2>Retirada de Skin</h2>\
        </div>\
        <div class="modal-body">\
        <p>Skin Retirada com Sucesso!</p>\
        </div>\
        <div class="modal-footer">\
        </div>\
    </div>\
</div>\
<script defer src="../JS/scripts/popUp.js"></script>'

const popUpDepositarSkin = '<link rel="stylesheet" href="../css/popUpGreen.css" defer>\
<div id="myModal" class="modal">\
    <!-- Modal content -->\
    <div class="modal-content">\
        <div class="modal-header">\
        <span class="close">&times;</span>\
        <h2>Deposito de Skins</h2>\
        </div>\
        <div class="modal-body">\
        <p>Skin Depositada com Sucesso!</p>\
        </div>\
        <div class="modal-footer">\
        </div>\
    </div>\
</div>\
<script defer src="../JS/scripts/popUp.js"></script>'

module.exports = {
    popUpDepositarSkin: popUpDepositarSkin,
    popUpSacarSkin: popUpSacarSkin,
    popUpRetirarInvestimento: popUpRetirarInvestimento,
    popUpInvestimento: popUpInvestimento,
    popUpCompraRed: popUpCompraRed,
    popUpCompraGreen: popUpCompraGreen,
    popUpSaqueRed: popUpSaqueRed,
    popUpSaqueGreen: popUpSaqueGreen,
    popUpDeposito: popUpDeposito
}