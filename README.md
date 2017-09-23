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

### Remote control via socket.io

```sh
t2 ap -n <SSID_NAME>
# Connect to http://<tessel_name>.local/
t2 run server/index.js
```

## Auth

```sh
t2 ap -n CodeTessel -p IHeartTessel
```
