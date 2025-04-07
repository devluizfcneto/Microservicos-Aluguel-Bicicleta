# Aluguel-Bicicleta



## Especificação e Requisitos do Sistema

### Casos de Uso

#### Atores
- Indivíduo: Pessoa fisica nao cadastrada
- Ciclista: Pessoa fisica cadastrada no sistema e habilitada para pegar bicicletas no bicicletário 
- Administradora CC: Sistema da administradora do cartao de credito
- Tranca: Dispositivo que prende ou libera a bicicleta
- Funcionario: Funcionario responsavel por realizar tarefas administrativas no contexto do sistema
- Reparador: Responsavel por reparar equipamentos (trancas e bicicletas) e cadastros (excluindo o de funcionários)
- Admnistrador: Responsavel pelos cadastros, incluindo o de funcionarios
- Escalonador: Processo do SO responsavel por disparar outros processos.

#### Detalhamento dos Casos de Uso
##### UC - Cadastrar Ciclista
- **Objetivo**: Permitir o cadastramento de um novo ciclista no sistema.
- **Requisitos**: RF1
- **Atores**: Indivíduo (primário) e Administradora CC (secundário)
- **Pré-condições**: Nenhuma
- **Trigger**: O indivíduo aciona a opção de cadastrar ciclista no aplicativo móvel.
- **Fluxo Principal**:
    1. O sistema solicita o email do indivíduo.
    2. O indivíduo informa o email.
    3. O sistema valida o email.
    4. O sistema apresenta um formulário para preenchimento dos dados
    do ciclista [A1].
        - Nome
        - Data de nascimento
        - Indicador de Brasileiro ou Estrangeiro
        - CPF
        - Passaporte, data de validade e País
        - Senha
        - Número do cartão de crédito
        - Nome no cartão de crédito
        - Validade do cartão de crédito
        - Código de segurança do cartão de crédito
        - Foto do documento (CPF ou Passaporte)
    5. O indivíduo fornece os dados solicitados.
    6. O sistema valida os dados [R1, R2].
    7. O sistema valida o cartão de crédito junto à Administradora CC [A2].
    8. O sistema registra os dados do indivíduo [A3].
    9. O sistema envia uma mensagem para o email fornecido [E1].
    10. O sistema informa que o email foi enviado e que está aguardando
    confirmação.
- **Fluxo Alternativos**:
    - [A1] Email já cadastrado ou inválido
        - A1.1 O sistema apresenta uma mensagem de erro.
        - A.2 Volta para o passo 1 do fluxo principal.

    [A2] - Dados inválidos
        A2.1 - O sistema apresenta os erros identificados.
        A2.2 - Volta para o passo 4 do fluxo principal.

    [A3] - Cartão reprovado
        A3.1 - O sistema informa que o cartão foi recusado.
        A3.2 - Volta para o passo 4 do fluxo principal. 
- **Fluxo de Exceção**:
- **Regras**:



##### UC02 - Confirmar email
- **Objetivo**: Permitir que indivíduo confirme que ele é o dono do email.
- **Requisitos**: RF2
- **Atores**: Indivíduo
- **Pré-condições**: Nenhuma
- **Trigger**: O indivíduo aciona o link que recebeu no email.
- **Fluxo Principal**:
    1. O sistema valida os dados.
    2. O sistema altera o registro do indivíduo para ativo [E1].
    3. O sistema registra a data/hora da confirmação.
    4. O sistema informa que o cadastro foi completado.
- **Fluxo Alternativos**: Nenhum
- **Fluxo de Exceção**:
    - [E1] Dados inválidos.
        - E1.1 O sistema informa que os dados não correspondem a um registro pendente.
        - E1.2 Caso de uso é encerrado.
- **Regras**: Nenhuma

##### UC03 - Alugar bicicleta
- **Objetivo**: Permitir que um ciclista alugue uma bicicleta.
- **Requisitos**: RF3, RF6, RF7, RF12, RF13, RF14
- **Atores**: Ciclista (primário), Tranca e Administradora CC (secundários)
- **Pré-condições**: O ciclista deverá estar autenticado no sistema, a tranca deve estar com o status "ocupada", a bicicleta deve estar com o status "disponível".
- **Trigger**: O ciclista seleciona a opção de pegar bicicleta no aplicativo móvel.
- **Fluxo Principal**:
    1. O sistema verifica se o ciclista pode pegar bicicleta [R1][E1].
    2. O sistema solicita o número da tranca.
    3. O ciclista informa o número da tranca [R5] [E4].
    4. O sistema valida o número da tranca [A1] [E5].
    5. O sistema lê o número da bicicleta presa na tranca [E2].
    6. O sistema envia a cobrança para a Administradora CC [R2].
    7. A Administradora CC confirma o pagamento [E3].
    8. O sistema registra os dados da retirada da bicicleta [R3].
    9. O sistema altera o status da bicicleta para "em uso".
    10. O sistema solicita a abertura da tranca alterando seu status para "livre".
    11. O sistema envia uma mensagem para o ciclista informando os dados do aluguel da bicicleta [R4].
    12. O sistema informa que a bicicleta está liberada.
- **Fluxo Alternativos**: 
    - [A1] Número da tranca inválido.
        - A1.1 O sistema informa que o número da tranca é inválido.
        - A1.2 Volta para o passo 2.
- **Fluxo de Exceção**:
    - [E1] Ciclista já tem um aluguel.
        - E1.1 O sistema envia um email para o ciclista com todos os dados do aluguel atual.
        - E1.2 O sistema informa que o ciclista não pode pegar outra bicicleta.
        - E1.3 Caso de uso é encerrado.
    - [E2] Não existe bicicleta na tranca.
        - E2.1 O sistema informa que não existe bicicleta na tranca.
        - E2.2 Caso de uso é encerrado.
    - [E3] Erro no pagamento ou pagamento não autorizado.
        - E3.1 O sistema informa que o pagamento não foi concluído.
        - E3.2 Caso de uso é encerrado.
    - [E4] A bicicleta não está em condições de uso (status "em reparo").
        - E4.1 O sistema informa que há um reparo requisitado para a bicicleta e que, portanto, ela não pode ser alugada.
        - E4.2 Caso de uso é encerrado.
    - [E5] A tranca não responde e se mantém fechada.
        - E5.1 O sistema apresenta uma mensagem de erro.
        - E5.2 Caso de uso é encerrado.
- **Regras**: 
    - R1 – Um ciclista só pode pegar uma bicicleta por vez e deve estar com o cadastro ativo.
    - R2 – Deverá ser feita uma cobrança de R$10,00 pelas duas primeiras horas de uso.
    - R3 – Devem ser registrados: a data/hora da retirada, o número da tranca, o número da bicicleta, o cartão usado para cobrança e o ciclista que a pegou.
    - R4 – Deve ser enviado um email para o ciclista com todos os dados da retirada da bicicleta, incluindo horário, totem de bicicletas e o valor cobrado.
    - R5 – A bicicleta não deve ter sido indicada para reparo.

##### UC04 - Devolver bicicleta
- **Objetivo**: Permitir que um indivíduo devolva uma bicicleta
- **Requisitos**: RF4, RF5, RF8, RF9, RF13, RF14, RF15
- **Atores**: Ciclista (primário), Tranca e AdministradoraCC (secundários)
- **Pré-condições**: A tranca deve possuir o status "livre", a bicicleta deve possuir o status "em uso".
- **Trigger**: O ator coloca a bicicleta na tranca.
- **Fluxo Principal**:
    1. O sistema lê o número da bicicleta.
    2. O sistema valida o número da bicicleta.
    3. O sistema calcula o valor a pagar [A4] [E1] [R1].
    4. O sistema registra os dados da devolução da bicicleta [A1] [R2].
    5. O sistema altera o status da bicicleta para "disponível".
    6. O sistema solicita o fechamento da tranca alterando seu status para "ocupada".
    7. O sistema envia uma mensagem para o ciclista informando os dados da devolução da bicicleta [R3].
    8. O sistema informa que a bicicleta foi devolvida [A3].
- **Fluxo Alternativos**:
    - [A1] A bicicleta ficou em uso por mais de 2 horas (isto é, além do período da taxa básica).
        - A1.1 O sistema envia a cobrança para a Administradora CC.
        - A1.2 A Administradora CC confirma o pagamento [A2].
        - A1.3 Volta para o passo 4.
    - [A2] Erro no pagamento ou pagamento não autorizado.
        - A2.1 O sistema registra o valor da cobrança extra para permitir ser efetuada posteriormente.
        - A2.2 Volta para o passo 4.
    - [A3] O ator seleciona a opção para requisitar reparo da bicicleta.
        - A3.1 O sistema registra a requisição de reparo para a bicicleta.
        - A3.2 O sistema altera o status da bicicleta para "reparo solicitado".
        - A3.3 O sistema informa que a bicicleta será reparada.
        - A3.4 Caso de uso é encerrado.
    - [A4] O status da bicicleta é "nova" ou "em reparo".
        - A4.1 O caso de uso é redirecionado para o UC8, passo 3.
- **Fluxo de Exceção**:
    - [E1] Número da bicicleta inválido.
        - E1.1 O sistema apresenta uma mensagem de erro.
        - E1.2 Caso de uso é encerrado.
- **Regras**:
    - R1 – Deverão ser cobrados R$5,00 para cada meia hora que exceder as duas horas iniciais.
    - R2 – Devem ser registrados: a data/hora da devolução, data/hora da cobrança, valor extra do aluguel, o cartão usado para cobrança, o número da bicicleta e o número da tranca.
    - R3 – Deve ser enviado um e-mail para o ciclista com todos os dados da devolução da bicicleta.

##### UC05 - Autenticar
- **Objetivo**: Confirmar os dados fornecidos no momento do Login no aplicativo móvel
- **Requisitos**: ---
- **Atores**: Indivíduo
- **Pré-condições**: O indivíduo deve ser previamente cadastrado.
- **Trigger**: O indivíduo acessa a tela de login do aplicativo móvel.
- **Fluxo Principal**:
    1. O sistema solicita o email e a senha do indivíduo.
    2. O indivíduo insere os dados.
    3. O sistema valida os dados [E1][E2].
    4. O sistema permite a entrada do indivíduo no sistema.
- **Fluxo Alternativos**: Nenhum
- **Fluxo de Exceção**:
    - [E1] Dados não cadastrados.
        - E1.1 O sistema informa que os dados não correspondem a um registro existente.
        - E1.2 Caso de uso é encerrado.
    - [E2] Senha incorreta.
        - E2.1 O sistema informa que a senha inserida não coincide com o email inserido.
        - E2.2 Caso de uso é encerrado.
- **Regras**: Nenhuma

##### UC06 - Alterar Dados do Ciclista
- **Objetivo**: Permitir que um ciclista altere seus dados no sistema.
- **Requisitos**: RF11
- **Atores**: Ciclista (primário)
- **Pré-condições**: O ciclista deverá estar autenticado no sistema.
- **Trigger**: O ciclista seleciona a opção de alterar dados no aplicativo móvel.
- **Fluxo Principal**:
    1. O sistema apresenta um formulário para preenchimento dos dados do ciclista.
        - Senha
        - Nome
        - Data de nascimento
        - Indicador de Brasileiro ou Estrangeiro
        - CPF
        - Passaporte, data de validade e País
        - Foto do documento
    2. O indivíduo fornece os dados solicitados [R1][R2].
    3. O sistema valida os dados [A1][A2].
    4. O sistema envia uma mensagem para o email do ciclista [E1].
- **Fluxo Alternativos**:
    - [A1] O ciclista informa apenas um ou nenhum dos dados
        - A1.1 O sistema valida apenas os dados informados.
        - A1.2 Continua para o passo 3 do fluxo principal.
    - [A2] Dados inválidos
        - A2.1 O sistema apresenta os erros identificados.
        - A2.2 Volta para o passo 1 do fluxo principal.
- **Fluxo de Exceção**:
    - [E1] Erro no envio do email
        - E1.1 O sistema informa que não foi possível enviar o email.
        - E1.2 Caso de uso é encerrado.
- **Regras**:
    - R1 - Se o indivíduo for brasileiro então o CPF é obrigatório. Se o indivíduo for estrangeiro então o passaporte e o país são obrigatórios. Todos os demais campos são obrigatórios.
    - R2 – A senha deve ser solicitada duas vezes e ambas devem ser idênticas.

##### UC07 - Alterar Cartão
- **Objetivo**: Permitir que um ciclista altere os dados de seu cartão no sistema.
- **Requisitos**: RF11
- **Atores**: Ciclista (primário) e Administradora CC (secundário)
- **Pré-condições**: O ciclista deverá estar autenticado no sistema.
- **Trigger**: O indivíduo aciona a opção de alterar cartão no aplicativo móvel.
- **Fluxo Principal**:
    1. O sistema apresenta um formulário para preenchimento dos dados do cartão.
        - Número do cartão de crédito
        - Nome no cartão de crédito
        - Validade do cartão de crédito
        - Código de segurança do cartão de crédito
    2. O indivíduo fornece os dados solicitados.
    3. O sistema valida o cartão de crédito junto à Administradora CC [A1].
    4. O sistema registra os dados do cartão [A2].
    5. O sistema envia uma mensagem para o e-mail do ciclista [E1].
- **Fluxo Alternativos**:
    - [A1] Dados inválidos
        - A1.1 O sistema apresenta os erros identificados.
        - A1.2 Volta para o passo 1 do fluxo principal.
    - [A2] Cartão reprovado
        - A2.1 O sistema informa que o cartão foi recusado.
        - A2.2 Volta para o passo 1 do fluxo principal.
- **Fluxo de Exceção**:
    - [E1] Erro no envio do email
        - E1.1 O sistema informa que não foi possível enviar o email.
        - E1.2 Caso de uso é encerrado.
- **Regras**: Nenhuma

##### UC08 - Incluir Bicicleta na Rede de Totens
- **Objetivo**: Permitir a entrada de uma nova bicicleta ou uma bicicleta reparada na rede de totens.
- **Requisitos**: RF17
- **Atores**: Reparador (primário) e Tranca (secundário)
- **Pré-condições**: O número da bicicleta deve ter sido cadastrado previamente no sistema, a bicicleta deve estar com status de "nova" ou "em reparo", a tranca deve estar com o status "livre".
- **Trigger**: O ator coloca a bicicleta na tranca.
- **Fluxo Principal**:
    1. O sistema lê o número da bicicleta.
    2. O sistema valida o número da bicicleta [E1].
    3. O sistema registra os dados da inclusão da bicicleta [R1].
    4. O sistema solicita o fechamento da tranca.
    5. O sistema altera o status da bicicleta para "disponível".
    6. O sistema apresenta os dados da inclusão da bicicleta.
- **Fluxo Alternativos**:
    - [A1] Bicicleta já cadastrada
        - A1.1 O sistema apresenta uma mensagem de erro.
        - A1.2 Volta para o passo 1 do fluxo principal.
- **Fluxo de Exceção**:
    - [E1] Número da bicicleta inválido.
        - E1.1 O sistema apresenta uma mensagem de erro.
        - E1.2 Caso de uso é encerrado.
    - [E2] Status da bicicleta é "em uso".
        - E2.1 A execução é redirecionada para o UC4, passo 3.
- **Regras**:
    - R1 – Devem ser registrados: a data/hora da inserção na tranca, o número da bicicleta e o número da tranca.

##### UC09 - Retirar Bicicleta para Reparo
- **Objetivo**: Permitir a retirada de uma bicicleta com reparo solicitado.
- **Requisitos**: RF18
- **Atores**: Reparador (primário) e tranca (secundário)
- **Pré-condições**: O número da bicicleta deve ter sido cadastrado previamente no sistema, a bicicleta deve estar presa em uma tranca e com status "reparo solicitado".
- **Trigger**: O ator aciona a opção de retirar a bicicleta.
- **Fluxo Principal**:
    1. O sistema mostra duas opções:
        - Reparo
        - Aposentadoria
    2. O reparador seleciona a opção de reparo [A1]
    3. O sistema solicita o número da tranca.
    4. O reparador fornece o número da tranca.
    5. O sistema valida o número da tranca [A2] [E1].
    6. O sistema solicita a abertura da tranca.
    7. O reparador retira a bicicleta da tranca.
    8. O sistema altera o status da bicicleta para "em reparo".
    9. O sistema registra os dados da retirada da bicicleta [R1].
    10. O sistema apresenta os dados da retirada da bicicleta.
- **Fluxo Alternativos**:
    - [A1] O indivíduo seleciona a opção de aposentadoria
        - A1.1 O sistema solicita o número da tranca.
        - A1.2 O reparador fornece o número da tranca.
        - A1.3 O sistema valida o número da tranca. [A2] [E1]
        - A1.4 O sistema solicita a abertura da tranca.
        - A1.5 O reparador retira a bicicleta da tranca.
        - A1.6 O sistema altera o status da bicicleta para "aposentada".
        - A1.7 O sistema registra os dados da retirada da bicicleta. [R1]
        - A1.8 O sistema envia uma mensagem para o reparador informando os dados da retirada da bicicleta [R2] [E2].
        - A1.9 O sistema informa que a bicicleta foi retirada com sucesso.
    - [A2] Bicicleta com status "disponível" ou tranca com status "livre"
        - A2.1 O sistema apresenta uma mensagem de erro.
        - A2.2 Volta para o passo 1 do fluxo principal.
- **Fluxo de Exceção**:
    - [E1] Número da tranca inválido.
        - E1.1 O sistema apresenta uma mensagem de erro.
        - E1.2 Caso de uso é encerrado.
- **Regras**:
    - R1 – Devem ser registrados: a data/hora da retirada da tranca, a matrícula do reparador e o número da bicicleta.

##### UC10 - Manter Cadastro de Bicicletas
- **Objetivo**: Permitir a manutenção do cadastro das bicicletas da empresa.
- **Requisitos**: RF16
- **Atores**: Funcionário
- **Pré-condições**: O funcionário deverá estar autenticado no sistema.
- **Trigger**: O ator aciona a opção de cadastro de bicicletas.
- **Fluxo Principal**:
    1. O sistema apresenta uma lista das bicicletas cadastradas no sistema com as seguintes informações.
        - Número
        - Marca
        - Modelo
        - Ano
        - Status
        - Localização
        - Opção para editar
        - Opção para remover [R4]
    2. O sistema apresenta uma opção para incluir uma bicicleta.
    3. O funcionário aciona a opção de incluir bicicleta [A1][A2].
    4. O sistema apresenta um formulário para preenchimento dos dados da bicicleta.
        - Número da bicicleta [R5]
        - Marca
        - Modelo
        - Ano
        - Status [R1]
    5. O funcionário fornece os dados solicitados [R2].
    6. O sistema valida os dados [A4].
    7. O sistema registra os dados.
    8. O sistema apresenta mensagem de sucesso e retorna à lista de bicicletas cadastradas (passo 1).
- **Fluxo Alternativos**:
    - [A1] O funcionário aciona a opção de editar bicicleta
        - A1.1 O sistema apresenta um formulário para preenchimento dos dados da bicicleta.
            - Número da bicicleta [R3]
            - Marca
            - Modelo
            - Ano
            - Status [R3]
        - A1.2 O funcionário fornece os dados solicitados [R2].
        - A1.3 O sistema valida os dados [A5].
        - A1.4 O sistema registra os dados.
        - A1.5 O sistema apresenta mensagem de sucesso e retorna à lista de bicicletas cadastradas (passo 1 do fluxo principal).
    - [A2] O funcionário aciona a opção de excluir bicicleta
        - A2.1 O sistema apresenta mensagem confirmando exclusão.
        - A2.2 O funcionário confirma exclusão [A3].
        - A2.3 O sistema altera o status para "excluída".
        - A2.4 O sistema apresenta mensagem de sucesso e retorna à lista de bicicletas cadastradas (passo 1 do fluxo principal).
    - [A3] O funcionário cancela a exclusão
        - A3.1 O sistema retorna à lista de bicicletas (passo 1 do fluxo principal).
    - [A4] Dados inválidos
        - A4.1 O sistema apresenta os erros identificados.
        - A4.2 Volta para o passo 4 do fluxo principal.
    - [A5] Dados inválidos
        - A5.1 O sistema apresenta os erros identificados.
        - A5.2 Volta para o passo 1 do fluxo do A1.
- **Fluxo de Exceção**: ---
- **Regras**:
    - R1 – O status inicial da bicicleta será "nova" (esta informação não pode ser editada).
    - R2 – Todos os dados do formulário são obrigatórios.
    - R3 – A informação não pode ser editada.
    - R4 – Apenas bicicletas com status "aposentada" e que não estiverem em nenhuma tranca podem ser excluídas.
    - R5 – O número da bicicleta deve ser gerado pelo próprio sistema e não pode ser editado.

##### UC11 - Incluir Tranca em Totem
- **Objetivo**: Permitir a entrada de uma nova tranca ou uma tranca reparada na rede de totens.
- **Requisitos**: RF20
- **Atores**: Reparador (primário) e Tranca (secundário)
- **Pré-condições**: O número da tranca deve ter sido cadastrado previamente no sistema, a tranca deve estar com status de "nova" ou "em reparo".
- **Trigger**: O ator encaixa a tranca no totem.
- **Fluxo Principal**:
    1. O sistema lê o número da tranca.
    2. O sistema valida o número da tranca [E1].
    3. O sistema registra os dados da inclusão da tranca [R1].
    4. O sistema altera o status da tranca para "livre".
    5. O sistema apresenta os dados da inclusão da tranca.
- **Fluxo Alternativos**: ---
- **Fluxo de Exceção**:
    - [E1] Número da tranca inválido (tranca não cadastrada no sistema).
        - E1.1 O sistema apresenta uma mensagem de erro.
        - E1.2 Caso de uso é encerrado.
- **Regras**:
    - R1 – Devem ser registrados: a data/hora da inserção no totem, a matrícula do reparador e o número da tranca.

##### UC12 - Retirar Tranca para Reparo
- **Objetivo**: Permitir a retirada de uma tranca com reparo solicitado.
- **Requisitos**: RF21
- **Atores**: Reparador (primário) e Tranca (secundário)
- **Pré-condições**: O número da tranca deve ter sido cadastrado previamente no sistema, a tranca deve estar sem nenhuma bicicleta presa nela.
- **Trigger**: O ator aciona a opção de retirar tranca.
- **Fluxo Principal**:
    1. O sistema mostra duas opções a seguir
        - Reparo
        - Aposentadoria
    2. O reparador seleciona a opção de reparo [A1]
    3. O sistema solicita o número da tranca.
    4. O reparador fornece o número da tranca.
    5. O sistema valida o número da tranca [A2] [E1].
    6. O sistema solicita a liberação da tranca.
    7. O reparador retira a tranca do totem.
    8. O sistema altera o status da tranca para "em reparo".
    9. O sistema registra os dados da retirada da tranca [R1].
    10. O sistema apresenta os dados da retirada da tranca.
- **Fluxo Alternativos**: 
    - [A1] O reparador seleciona a opção de aposentadoria
        - A1.1 O sistema solicita o número da tranca.
        - A1.2 O reparador fornece o número da tranca.
        - A1.3 O sistema valida o número da tranca. [A2] [E1]
        - A1.4 O sistema solicita a liberação da tranca.
        - A1.5 O reparador retira a tranca do totem.
        - A1.6 O sistema altera o status da tranca para "aposentada".
        - A1.7 O sistema registra os dados da retirada da tranca. [R1]
        - A1.8 O sistema apresenta os dados da retirada da tranca.
    - [A2] Tranca com status diferente de "reparo solicitado"
        - A2.1 O sistema apresenta uma mensagem de erro.
        - A2.2 Volta para o passo 1 do fluxo principal.
- **Fluxo de Exceção**:
    - [E1] Número da tranca inválido.
        - E1.1 O sistema apresenta uma mensagem de erro.
        - E1.2 Caso de uso é encerrado.
- **Regras**:
    - R1 – Devem ser registrados: a data/hora da retirada da tranca, o número da tranca e a matrícula do reparador.

##### UC13 - Manter Cadastro de Trancas
- **Objetivo**: Permitir a manutenção do cadastro das trancas da empresa.
- **Requisitos**: RF19
- **Atores**: Funcionário
- **Pré-condições**: O funcionário deverá estar autenticado no sistema.
- **Trigger**: O ator aciona a opção de cadastro de trancas.
- **Fluxo Principal**:
    1. O sistema apresenta uma lista das trancas cadastradas no sistema com as seguintes informações.
        - Número
        - Status
        - Localização
        - Ano de fabricação
        - Modelo
        - Opção para remover [R4]
    2. O sistema apresenta uma opção para incluir uma tranca.
    3. O funcionário aciona a opção de incluir tranca[A1][A2].
    4. O sistema apresenta um formulário para preenchimento dos dados da tranca.
        - Número da tranca [R3]
        - Status [R1] [R3]
        - Ano de fabricação
        - Modelo
    5. O funcionário fornece os dados solicitados [R2].
    6. O sistema valida os dados [A4].
    7. O sistema registra os dados.
    8. O sistema apresenta mensagem de sucesso.
    9. Volta para o passo 1.
- **Fluxo Alternativos**:
    - [A1] O funcionário aciona a opção de editar tranca
        - A1.1 O sistema apresenta um formulário para preenchimento dos dados da tranca.
            - Número da tranca [R3]
            - Status [R1] [R3]
            - Ano de fabricação
            - Modelo
        - A1.2 O funcionário fornece os dados solicitados [R2].
        - A1.3 O sistema valida os dados [A5].
        - A1.4 O sistema registra os dados.
        - A1.5 O sistema apresenta mensagem de sucesso e retorna à lista de trancas cadastradas (passo 1 do fluxo principal).
    - [A2] O funcionário aciona a opção de excluir tranca
        - A2.1 O sistema apresenta mensagem confirmando exclusão.
        - A2.2 O funcionário confirma exclusão [A3].
        - A2.3 O sistema altera o status para "excluída".
        - A2.4 O sistema apresenta mensagem de sucesso e retorna à lista de trancas cadastradas (passo 1 do fluxo principal).
    - [A3] O funcionário cancela a exclusão
        - A3.1 O sistema retorna à lista de trancas (passo 1 do fluxo principal).
    - [A4] Dados inválidos
        - A4.1 O sistema apresenta os erros identificados.
        - A4.2 Volta para o passo 4 do fluxo principal.
- **Fluxo de Exceção**: ---
- **Regras**:
    - R1 – O status inicial da tranca será "nova" (esta informação não pode ser editada).
    - R2 – Todos os dados do formulário são obrigatórios.
    - R3 – A informação não pode ser editada.
    - R4 – Apenas trancas que não estiverem com nenhuma bicicleta podem ser excluídas.

##### UC14 - Manter Cadastro de Totens
- **Objetivo**: Permitir a manutenção do cadastro dos totens da empresa.
- **Requisitos**: RF22
- **Atores**: Funcionário
- **Pré-condições**: O funcionário deverá estar autenticado no sistema.
- **Trigger**: O ator aciona a opção de cadastro de totens.
- **Fluxo Principal**:
    1. O sistema apresenta uma lista dos totens cadastrados no sistema com as seguintes informações.
        - Número
        - Localização
        - Opção para remover [R3]
        - Opção para listar trancas
        - Opção para listar bicicletas
    2. O sistema apresenta uma opção para incluir um totem.
    3. O funcionário aciona a opção de incluir totem [A1] [A4] [A5].
    4. O sistema apresenta um formulário para preenchimento dos dados do totem.
        - Número [R2]
        - Descrição
    5. O funcionário fornece os dados solicitados [R1].
    6. O sistema valida os dados [A3].
    7. O sistema registra os dados.
    8. O sistema apresenta mensagem de sucesso.
    9. Volta para o passo 1.
- **Fluxo Alternativos**:
    - [A1] O funcionário aciona a opção de excluir totem
        - A1.1 O sistema apresenta mensagem confirmando exclusão.
        - A1.2 O funcionário confirma exclusão [A2].
        - A1.3 O sistema exclui o registro.
        - A1.4 O sistema apresenta mensagem de sucesso e retorna à lista de totens cadastrados (passo 1 do fluxo principal).
    - [A2] O funcionário cancela a exclusão
        - A2.1 O sistema retorna à lista de totens (passo 1 do fluxo principal).
    - [A3] Dados inválidos
        - A3.1 O sistema apresenta os erros identificados.
        - A3.2 Volta para o passo 4 do fluxo principal.
    - [A4] O funcionário aciona a opção de listar trancas
        - A4.1 Vai para o passo 1 do fluxo principal do UC13
    - [A5] O funcionário aciona a opção de listar bicicletas
        - A5.1 Vai para o passo 1 do fluxo principal do UC10
- **Fluxo de Exceção**: ---
- **Regras**:
    - R1 – Todos os dados do formulário são obrigatórios.
    - R2 – A informação não pode ser editada.
    - R3 – Apenas os totens que não possuem nenhuma tranca podem ser excluídos.

##### UC15 - Manter Cadastro de Funcionários
- **Objetivo**: Permitir a manutenção do cadastro dos funcionários da empresa.
- **Requisitos**: RF23
- **Atores**: Funcionário
- **Pré-condições**: O funcionário deverá estar autenticado no sistema.
- **Trigger**: O ator aciona a opção de cadastro de funcionários.
- **Fluxo Principal**:
    1. O sistema apresenta uma lista dos funcionários cadastrados no sistema com as seguintes informações.
        - Matrícula [R2]
        - Nome
        - Idade
        - Função [R3]
        - CPF
        - Opção para editar
        - Opção para remover
    2. O sistema apresenta uma opção para incluir um funcionário.
    3. O funcionário aciona a opção de incluir funcionário[A1][A2].
    4. O sistema apresenta um formulário para preenchimento dos dados do funcionário.
        - Matrícula [R2]
        - Senha
        - Nome
        - Idade
        - Função
        - CPF
    5. O funcionário fornece os dados solicitados [R1].
    6. O sistema valida os dados [A4].
    7. O sistema registra os dados.
    8. O sistema apresenta mensagem de sucesso.
    9. Volta para o passo 1.
- **Fluxo Alternativos**:
    - [A1] O funcionário aciona a opção de editar funcionário
        - A1.1 O sistema apresenta um formulário para preenchimento dos dados do funcionário.
            - Nome
            - Idade
            - Matrícula [R2]
            - Senha
            - Função
            - Documento [R2]
        - A1.2 O funcionário fornece os dados solicitados [R1].
        - A1.3 O sistema valida os dados [A5].
        - A1.4 O sistema registra os dados.
        - A1.5 O sistema apresenta mensagem de sucesso e retorna à lista de funcionários cadastrados (passo 1 do fluxo principal).
    - [A2] O funcionário aciona a opção de excluir funcionário
        - A2.1 O sistema apresenta mensagem confirmando exclusão.
        - A2.2 O funcionário confirma exclusão [A3].
        - A2.3 O sistema exclui o registro.
        - A2.4 O sistema apresenta mensagem de sucesso e retorna à lista de funcionários cadastrados (passo 1 do fluxo principal).
    - [A3] O funcionário cancela a exclusão
        - A3.1 O sistema retorna à lista de funcionários (passo 1 do fluxo principal).
    - [A4] Dados inválidos
        - A4.1 O sistema apresenta os erros identificados.
        - A4.2 Volta para o passo 4 do fluxo principal.
    - [A5] Dados inválidos
        - A5.1 O sistema apresenta os erros identificados.
        - A5.2 Volta para o passo 1 do fluxo do A1.
- **Fluxo de Exceção**: ---
- **Regras**:
    - R1 – Todos os dados do formulário são obrigatórios.
    - R2 – A informação não pode ser editada.
    - R3 – A função do funcionário pode ser administrativo ou reparador.

##### UC16 - Cobrar Taxas Atrasadas
- **Objetivo**: Permitir a cobrança de taxas extras (isto é, além da taxa básica) que não puderam ser cobrados na devolução da bicicleta
- **Requisitos**: RF10
- **Atores**: Escalonador
- **Pré-condições**: Devem ter ocorrido devoluções de bicicletas no último intervalo de 12hs
- **Trigger**: Todos os dias às 2hs
- **Fluxo Principal**:
    1. O sistema identifica o conjunto de cobranças relativas a taxas extras de aluguel que ainda não foram cobradas.
    2. O sistema realiza a cobrança para cada ciclista em atraso [R1][E1].
    3. O sistema notifica os ciclistas que tiveram cobrança em atraso [R2].
    4. Caso de uso é encerrado
- **Fluxo Alternativos**: ---
- **Fluxo de Exceção**:
    - [E1] Erro no pagamento ou pagamento não autorizado.
        - E1.1 O sistema mantém o valor da cobrança extra para permitir ser efetuada posteriormente.
        - E1.2 Volta para o passo 2 para o próximo ciclista.
- **Regras**:
    - R1 – Devem ser registrados: data/hora da cobrança, valor extra do aluguel, o cartão usado para cobrança.
    - R2 – Deve ser enviado um e-mail para o ciclista com todos os dados da devolução da bicicleta referente à cobrança em atraso.

##### UC16 - Cobrar Taxas Atrasadas
- **Objetivo**: Permitir a cobrança de taxas extras (isto é, além da taxa básica) que não puderam ser cobrados na devolução da bicicleta
- **Requisitos**: RF10
- **Atores**: Escalonador
- **Pré-condições**: Devem ter ocorrido devoluções de bicicletas no último intervalo de 12hs
- **Trigger**: Todos os dias às 2hs
- **Fluxo Principal**:
    1. O sistema identifica o conjunto de cobranças relativas a taxas extras de aluguel que ainda não foram cobradas.
    2. O sistema realiza a cobrança para cada ciclista em atraso [R1][E1].
    3. O sistema notifica os ciclistas que tiveram cobrança em atraso [R2].
    4. Caso de uso é encerrado
- **Fluxo Alternativos**: ---
- **Fluxo de Exceção**:
    - [E1] Erro no pagamento ou pagamento não autorizado.
        - E1.1 O sistema mantém o valor da cobrança extra para permitir ser efetuada posteriormente.
        - E1.2 Volta para o passo 2 para o próximo ciclista.
- **Regras**:
    - R1 – Devem ser registrados: data/hora da cobrança, valor extra do aluguel, o cartão usado para cobrança.
    - R2 – Deve ser enviado um e-mail para o ciclista com todos os dados da devolução da bicicleta referente à cobrança em atraso.