package com.example.kotlin.core.util

import org.spongycastle.util.encoders.Hex
import java.security.SecureRandom

fun CreateNonce(algo: String) : String {
    var b : ByteArray = ByteArray(20)
    SecureRandom.getInstance(algo).nextBytes(b)
    return Hex.toHexString(b)
}
