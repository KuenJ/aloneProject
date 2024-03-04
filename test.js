for (let i = 1; i <= 128; i++) {
  console.log(`{
            "@id": "dtmi:dibaPlc:T5:value${i};1",
            "@type": [
                "Property",
                "BooleanValue"
            ],
            "displayName": {
                "en": "value${i}"
            },
            "name": "value${i}",
            "schema": "boolean",
            "writable": true
        },`);
}
