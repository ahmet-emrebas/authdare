package com.authdare.workspace

import android.os.AsyncTask
import android.util.Xml
import org.xmlpull.v1.XmlPullParser
import java.io.InputStream
import java.net.URL

const val appleURL =
    "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topfreeapplications/limit=10/xml"
private val ns: String? = null

fun main(args: Array<String>) {

    val inputStream = URL(appleURL).openStream()
    As().execute(inputStream)
}

class As() : AsyncTask<Any, Void, Any>() {

    override fun doInBackground(vararg params: Any?): Any {
        val parser: XmlPullParser = Xml.newPullParser()
        parser.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false)
        parser.setInput(params[0] as InputStream, null)

        val event1 = parser.next()

        println(event1)
        return event1
    }

}

