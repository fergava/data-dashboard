# Data Dashboard

Dashboard baseada em dados de estudantes da Laboratoria.

### Demonstração:

![dashboard](https://github.com/fergava/data-dashboard/blob/master/dashboard.PNG?raw=true)

## Funcionalidades:

### Dados que compõem o dashboard:

- O número total de alunas presentes pela sede e geração;
- A porcentagem de alunas desistentes;
- O número de alunas que excedem a meta de pontos, em média, de todos os sprints realizados. O objetivo dos pontos é 70% do total de pontos em Habilidades socio-emocionais e Tech;
- A porcentagem que representa os dados anteriores em relação ao total de alunas;
- O Net Promoter Score (NPS) médio dos sprints realizados. O NPS é calculado com base no levantamento que as estudantes respondem em relação à recomendação que dariam da Laboratoria, sob a seguinte fórmula:

```
[Promoters] = [Respostas 9 ou 10] / [Total respostas] * 100
[Passive] = [Respostas 7 a 8] / [Total Respostas] * 100
[Detractors] = [Respostas entre 1 e 6] / [Total Respostas] * 100

[NPS] = [Promoters] - [Detractors]
```

- A quantidade e porcentagem que representa o total de alunas que excedem a meta de pontos técnicos em média e sprint;
- O valor e a porcentagem que representam o número total de alunas que excedem a meta de pontos de HSE, em média, e por sprint;
- O percentual de alunas satisfeitas com a experiência da Laboratoria;
- A pontuação média das professoras;
- A pontuação média das mestres Jedi;
- Representação gráfica com o uso do [Google Charts](https://developers.google.com/chart/)

## Roadmap oficial do projeto

### versão 2.0.0 (sem previsão)
- Cadastro e login de usuários utilizando a validação do [Firebase Authentitcation](https://firebase.google.com/docs/auth/?hl=pt-br);
- Uso de React;
- Atenderá principios de SPA;
- Diminuição do número de telas;
- Melhora na disposição das informações e gráficos que ficarão visíveis sem barra de rolagem;
- Melhora do design e paleta de cores.

### versão 1.0.0 (Realizada)
- funcionalidades já citadas.

## Tecnologias utilizadas:

- HTML5
- CSS3
- JavaScript Vanilla
- Eslint
- Flexbox
- [Google Charts](https://developers.google.com/chart/)
