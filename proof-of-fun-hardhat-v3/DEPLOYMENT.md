# 🚀 Guía de Deployment a Base Sepolia

## Pasos para desplegar Proof of Fun en Base Sepolia

### 1. Obtener ETH en Base Sepolia

Necesitas ETH de prueba en Base Sepolia para pagar el gas de deployment:

1. Ve a [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
2. O usa el [Superchain Faucet](https://app.optimism.io/faucet?utm_source=basedocs)
3. Conecta tu wallet y solicita ETH de prueba

### 2. Configurar tu Private Key

**⚠️ IMPORTANTE: Nunca compartas tu private key real. Usa una wallet de desarrollo.**

1. Abre MetaMask o tu wallet
2. Ve a: Configuración → Seguridad y Privacidad → Revelar clave privada
3. Copia la clave privada (sin el prefijo `0x`)

### 3. Editar el archivo `.env`

Abre el archivo `.env` en la carpeta `proof-of-fun-hardhat-v3` y completa:

```env
# Tu private key SIN el prefijo 0x
PRIVATE_KEY=tu_clave_privada_aqui

# RPC de Base Sepolia (ya está configurado)
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Para verificar contratos en BaseScan (opcional)
BASESCAN_API_KEY=tu_basescan_api_key
```

### 4. Compilar los contratos

```bash
cd proof-of-fun-hardhat-v3
npm run compile
```

### 5. Desplegar a Base Sepolia

```bash
npm run deploy:baseSepolia
```

### 6. Guardar las direcciones

Después del deployment, verás algo como:

```
✅ ProofOfFun deployed to: 0x...
✅ EventManager deployed to: 0x...
✅ AnonymousVoteToken deployed to: 0x...
✅ ProofOfFunFactory deployed to: 0x...
```

**Guarda estas direcciones** - las necesitarás para interactuar con los contratos.

### 7. Verificar en BaseScan (Opcional)

Para verificar tus contratos en BaseScan:

1. Obtén una API key en [BaseScan](https://basescan.org/myapikey)
2. Agrégala a tu `.env`
3. Ejecuta para cada contrato:

```bash
npx hardhat verify --network baseSepolia DIRECCION_DEL_CONTRATO
```

---

## 🔧 Comandos Útiles

```bash
# Compilar contratos
npm run compile

# Limpiar y recompilar
npx hardhat clean
npm run compile

# Ver configuración de red
npx hardhat config

# Desplegar en red local (para testing)
npm run node  # En una terminal
npm run deploy:localhost  # En otra terminal
```

---

## 📝 Información de Red

**Base Sepolia Testnet**
- Chain ID: 84532
- RPC URL: https://sepolia.base.org
- Explorer: https://sepolia.basescan.org
- Faucet: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

---

## ⚠️ Troubleshooting

### Error: "insufficient funds"
- Asegúrate de tener ETH de prueba en Base Sepolia
- Verifica que tu address tenga balance

### Error: "invalid private key"
- Asegúrate de copiar la private key SIN el prefijo `0x`
- Verifica que no haya espacios al inicio o final

### Error: "network error"
- Verifica tu conexión a internet
- Intenta usar un RPC alternativo

---

## 🎯 Próximos Pasos

Después del deployment:

1. Crea un evento usando el contrato EventManager
2. Configura las categorías en ProofOfFun
3. Permite que los usuarios voten
4. Consulta los resultados (Proof of Fun)

¡Felicidades! 🎉 Tus contratos están desplegados en Base Sepolia.
