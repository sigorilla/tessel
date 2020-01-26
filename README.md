# tessel-2

## Examples

* [without j5 lib](./examples/index.js)
* [j5 leds blinking](./example/led-blink.js)
* [j5 sensor](./example/sensor.js)
* [j5 button](./example/button.js)

### Try example

```sh
npm run try -- example/sensor.js
```

## Projects

```sh
t2 ap -n <SSID_NAME>
t2 run server/<PROJECT>/index.js
# Connect to http://<tessel_name>.local/<PROJECT>/
```

Available projects:
- `motors` — control servo via socket.io.

### Deploy

```
t2 push server/<PROJECT>/index.js
```

## Auth

```sh
t2 ap -n <SSID> -p <PASS>
```
