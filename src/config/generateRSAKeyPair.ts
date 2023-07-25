import crypto from "crypto";
import fs from "fs";
import path from "path";

(() => {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, // Size of key in bits.
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  fs.writeFileSync(
    path.join(__dirname, "..", "..", "id_rsa_pub.pem"),
    keyPair.publicKey
  );
  fs.writeFileSync(
    path.join(__dirname, "..", "..", "id_rsa_priv.pem"),
    keyPair.privateKey
  );

  console.log("Chaves geradas com sucesso.");
})();