# tessel-2

Node: 8.11.3

### Try example

```sh
npm run try -- example/index.js
```

## Projects

```sh
t2 ap -n <SSID_NAME>
t2 run src/server/<PROJECT>/index.js
# Connect to http://<tessel_name>/<PROJECT>/
```

Available projects:
- `motors` — control servo via socket.io.
- `monitor` — BME-280.

### Deploy

```sh
npx t2 push src/server/<PROJECT>/index.js
```

## Auth

```sh
t2 ap -n <SSID> -p <PASS>
```
