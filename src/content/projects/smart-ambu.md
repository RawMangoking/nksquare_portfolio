---
title: 'Smart-AMBU: IoT monitoring for manual resuscitators'
cardTitle: Smart-AMBU
brief: A low-cost add-on that gives live pressure and breathing-rate feedback for Ambu bags.
kind: main
status: complete
order: 4
tech: [Arduino Uno, ESP32, MQTT, Node-RED, C++]
repo: https://github.com/narenkumarchandran/Smart-AMBU-MONITOR
highlight: { value: '~20 Hz', label: 'pressure sampling, streamed live over MQTT' }
cover: ../../assets/projects/ambu-real-device-setup.png
coverAlt: The Smart-AMBU sensor hardware attached to a manual resuscitator.
files:
  - name: device-setup.png
    image: ../../assets/projects/ambu-real-device-setup.png
    caption: The sensor hardware fitted to a standard Ambu bag.
  - name: device-photo.png
    image: ../../assets/projects/ambu-real-image.png
    caption: The working prototype.
  - name: dashboard.png
    image: ../../assets/projects/ambu-dashboard-preview.png
    caption: The Node-RED dashboard with live pressure waveform and gauges.
  - name: node-red-flow.png
    image: ../../assets/projects/ambu-node-red-circuit.png
    caption: The Node-RED flow that routes the MQTT data to the dashboard.
---

## The problem

Manual resuscitators (Ambu bags) save lives in emergencies, but they give no feedback. It's easy to squeeze too hard, risking lung injury, or to lose the mask seal without noticing.

## How it works

- A differential pressure sensor (MPX5010DP) measures airway pressure.
- An Arduino Uno samples it at about 20 Hz, smooths it and calculates peak pressure and breaths per minute.
- An ESP32 sends the data as JSON over Wi-Fi using MQTT.
- A Node-RED dashboard shows live waveforms and gauges, with alarms for high pressure and for a poor mask seal.

## What I learned

Splitting the work across two microcontrollers kept the sampling steady while the network handled itself. It also meant protecting the 3.3 V ESP32 from the Arduino's 5 V signal with a voltage divider.
