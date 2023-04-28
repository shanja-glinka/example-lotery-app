#  example-lottery-app


# Installation
The database `MySQL` configuration is in 

```bash
  /doc/lottery_db_name.sql
```

Strict mode must be disabled in MySQL `sql_mode= ""`


# Usage
Run command to run the script

```bash
  npm run dev
  npm run client
```

For client follow 
```http
  GET /localhost:8080
```

For server follow 
```http
  GET /localhost:3001
```



# API

Main call
```http
  POST /lottery/try
```

Calling a lottery attempt without registration
```http
  POST /lottery/try/roll
```




## Appendix

[en]
The lottery function is located in the dirrectory `/server/utils/Lottery.js`. The function creates Minimum and Maximum values for the rand function based on the current time and time until the end of the next day. The minimum and maximum values are calculated in seconds from the remaining time to the next day. It turns out that the closer to the final of the day, the higher the chance of victory. Winner could be one in a day

[ru]
Функция лотереи находится тут `/server/utils/Lottery.js`.Функция создает Минимальные и максимальные значения для рандома исходя из текущего времени и времени до конца следующего дня. Минимальные и максимальные значения исчисляются в секундах от оставшегося времени до следующего дня. Получается так что чем ближе к финалу дня, тем выше шанс победы. Победитель может быть один за день

