package com.authdare.rssreader

import org.xmlpull.v1.XmlPullParser
import org.xmlpull.v1.XmlPullParserFactory
import java.lang.Exception
import kotlin.collections.ArrayList

data class FeedEntry(var title: String = "", var summary: String = "", var artist: String = ""){
    override fun toString(): String {
        return """
            title   =${title.subSequence(0,5)}
            summary =${summary.subSequence(0, 20)}
            artist  =$artist
        """.trimIndent()
    }
}

class XmlParser {
    private val TAG = "XmlParser"

    val applications = ArrayList<FeedEntry>()


    fun parse(xmlData: String): ArrayList<FeedEntry> {
        var status = true
        var inEntry = false
        var textValue = ""
        try {
            val factory = XmlPullParserFactory.newInstance()
            factory.isNamespaceAware = true
            val xpp = factory.newPullParser()
            xpp.setInput(xmlData.reader())

            var eventType = xpp.eventType
            var currentRecord = FeedEntry()

            while (eventType != XmlPullParser.END_DOCUMENT) {

                val tagName = xpp.name?.toLowerCase()

                when (eventType) {
                    XmlPullParser.START_TAG -> {
                        if (tagName == "entry") {
                            inEntry = true
                        }
                    }
                    XmlPullParser.TEXT -> {
                        textValue = xpp.text
                    }
                    XmlPullParser.END_TAG -> {
                        if (inEntry) {
                            when (tagName) {
                                "entry" -> {
                                    applications.add(currentRecord)
                                    inEntry = false
                                    currentRecord = FeedEntry()

                                }
                                "title" -> currentRecord.title = textValue
                                "summary" -> currentRecord.summary = textValue
                                "artist" -> currentRecord.artist = textValue
                            }
                        }
                    }
                }
                eventType = xpp.next()
            }

        } catch (err: Exception) {
            err.printStackTrace()
            status = false
        }
        return applications
    }
}