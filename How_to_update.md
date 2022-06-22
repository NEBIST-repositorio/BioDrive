# BioDrive

## Como fazer alterações à página inicial

1. Aplicar as alterações ao ficheiro index na secção de classe ___page___ dentro do ___main___ Markup :  `<section class="page">`. 
    + [NOTA: garantir que mais nenhuma secção foi modificada equivocamente]
2. Copiar a secção alterada e colar na mesma secção, mas do ficheiro ___indexprivate.html___.
3. Ir ao website <a href="https://robinmoisson.github.io/staticrypt/">_StatiCrypt_</a>, colar o código do ficheiro ___indexprivate.html___ na caixa correspondente e definir a palavra-passe desejada. Gerar o ficheiro html encriptado e fazer download do mesmo.
4. Colocar o ficheiro anteriormente gerado na pasta _html_ com o nome ___encrypted.html___.
5. No ___head___ do ficheiro ___encrypted.html___ eleminar a porção ___style___ e colar o link do ficheiro css no seu lugar: 
    + `<link rel="stylesheet" href="../css/password.css" />`
