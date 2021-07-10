package com.authdare.rssreader

import android.content.Context
import android.os.AsyncTask
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.ListView
import androidx.appcompat.app.AppCompatActivity
import com.authdare.rssreader.databinding.ActivityMainBinding
import java.net.URL
import kotlin.properties.Delegates

class AppleURL(var url: String, var limit: Int) {
    override fun toString(): String {
        return String.format(url, limit)
    }
}

const val FREE_APPS =
    "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topfreeapplications/limit=%d/xml"
const val PAID_APPS =
    "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/toppaidapplications/limit=%d/xml"
const val SONGS =
    "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topsongs/limit=%d/xml"
const val CURRENT_URL_KEY = "CURRENT_URL_KEY"
const val CURRENT_LIMIT_KEY = "CURRENT_LIMIT_KEY"

class MainActivity : AppCompatActivity() {

    private lateinit var activityBinding: ActivityMainBinding
    var feedURL = AppleURL(FREE_APPS, 5)


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(activityBinding.root)

        if (savedInstanceState != null) {
            feedURL.url = savedInstanceState.getString(CURRENT_URL_KEY).toString()
            feedURL.limit = savedInstanceState.getInt(CURRENT_LIMIT_KEY)
            updateFeeds(feedURL.toString())
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        downloadData?.cancel(true)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putString(CURRENT_URL_KEY, feedURL.url)
        outState.putInt(CURRENT_LIMIT_KEY, feedURL.limit)

    }

    companion object {
        private class DownloadData(contextParam: Context, listViewPram: ListView) :
            AsyncTask<String, Void, String>() {
            private val TAG: String = "DownloadData"

            var context: Context by Delegates.notNull()
            var listView: ListView by Delegates.notNull()

            init {
                context = contextParam
                listView = listViewPram
            }

            override fun onPostExecute(result: String) {
                super.onPostExecute(result)
                val parserApp = XmlParser()
                parserApp.parse(result)

                val arrayAdaptor =
                    FeedAdaptor(
                        context,
                        R.layout.list_item,
                        parserApp.applications
                    )
                listView.adapter = arrayAdaptor
            }

            private fun downloadData(url: String): String {
                if (url == "CLOSED") {
                    return ""
                }
                return URL(url).readText()
            }

            override fun doInBackground(vararg urls: String?): String {
                val data = downloadData(urls[0]!!)
                return data
            }

        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.feed_menu, menu)
        when (feedURL.limit) {
            5 -> menu?.findItem(R.id.listSize5)?.isChecked = true
            10 -> menu?.findItem(R.id.listSize10)?.isChecked = true
            25 -> menu?.findItem(R.id.listSize25)?.isChecked = true
        }
        return super.onCreateOptionsMenu(menu)
    }


    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        item.isChecked = true

        when (item.itemId) {
            R.id.listSize5 -> feedURL.limit = 5
            R.id.listSize10 -> feedURL.limit = 10
            R.id.listSize25 -> feedURL.limit = 25
        }

        when (item.itemId) {
            R.id.menuFree -> feedURL.url = FREE_APPS
            R.id.menuPaid -> feedURL.url = PAID_APPS
            R.id.menuSong -> feedURL.url = SONGS
        }


        when (item.itemId) {
            R.id.clearList -> {
                feedURL.url = "CLOSED"
            }
        }

        updateFeeds(feedURL.toString())
        return super.onOptionsItemSelected(item)
    }

    private var downloadData: DownloadData? = null
    private fun updateFeeds(feedURL: String) {
        downloadData = DownloadData(this, activityBinding.xmlListView)
        downloadData?.execute(feedURL)
    }
}