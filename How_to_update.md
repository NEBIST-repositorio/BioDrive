# BioDrive

## Como fazer alterações à página inicial

1. Aplicar as alterações ao ficheiro index na secção de classe _page_ dentro do _main_ Markup :  `<section class="page">`. [NOTA: garantir que mais nenhuma secção foi modificada equivocamente]
2. Copiar a secção alterada e colar na mesma secção, mas do ficheiro _indexprivate.html_.
3. Ir ao website <a href="https://robinmoisson.github.io/staticrypt/">_StatiCrypt_</a>, colar o código do ficheiro _indexprivate.html_ na caixa correspondente e definir a palavra-passe desejada. Gerar o ficheiro html encriptado e fazer download do mesmo.
4. Colocar o ficheiro anteriormente gerado na pasta _html_ com o nome _encrypted.html_.
5. No _head_ do ficheiro _encrypted.html_ eleminar a porção _style_ e colar o link do ficheiro css no seu lugar: 
    + `<link rel="stylesheet" href="../css/password.css" />`
