import { mount, shallow } from "enzyme";
import React from 'react'
import Calendar from './Calendar'
import '../setupTests'


it("renders without crashing", () => {
    shallow(<Calendar />);
});

it("renders calendar", () => {
    const wrapper = mount(<Calendar eventsData={[]} />)
    const calTable = wrapper.find('.cal-table')
    const calTableHeadRow = calTable.find('thead > tr')
    expect(calTableHeadRow.childAt(0).text()).toEqual("Sunday")
    expect(calTableHeadRow.childAt(1).text()).toEqual("Monday")
    expect(calTableHeadRow.childAt(2).text()).toEqual("Tuesday")
    expect(calTableHeadRow.childAt(3).text()).toEqual("Wednesday")
    expect(calTableHeadRow.childAt(4).text()).toEqual("Thursday")
    expect(calTableHeadRow.childAt(5).text()).toEqual("Friday")
    expect(calTableHeadRow.childAt(6).text()).toEqual("Saturday")
})

it("should render one event", () => {
    const todayDate = new Date();
    const singleEvent = {
        "id": 3098905,
        "date": "2020-04-15T23:02:11",
        "date_gmt": "2020-04-16T03:02:11",
        "guid": {
            "rendered": "https://central.wordcamp.org/wordcamps/wordcamp-wordcamp-india-online/"
        },
        "modified": "2021-02-14T19:08:44",
        "modified_gmt": "2021-02-15T00:08:44",
        "slug": "wordcamp-india-online",
        "status": "wcpt-closed",
        "type": "wordcamp",
        "link": "https://central.wordcamp.org/wordcamps/wordcamp-india-online/",
        "title": {
            "rendered": "WordCamp India (Online)"
        },
        "content": {
            "rendered": "<p><span style=\"font-weight: 400\">We are happy to announce that communities across India are joining hands to organize the first ever edition of WordCamp India Online from January 30 to February 14. </span><span style=\"font-weight: 400\">Yes! You read those dates right. <strong>We plan to have our WordCamp over three weekends! </strong></span></p>\n<p><span style=\"font-weight: 400\">We are planning a unique event that has something for everyone at the same time we do not want to try to simulate a traditional in-person event in an online space. </span><span style=\"font-weight: 400\">Since WordCamp India 2021 is a fully online event, anyone from any part of the world would be able to attend. Tickets for the event will be completely free! All you need is a computer or a smartphone with an internet connection to participate in the event.</span></p>\n<p>Come, join us!</p>\n",
            "protected": false
        },
        "author": 3201356,
        "featured_media": 3134813,
        "template": "",
        "Start Date (YYYY-mm-dd)": (new Date(todayDate.getFullYear(), todayDate.getMonth(), 15).valueOf() / 1000).toString(),
        "End Date (YYYY-mm-dd)": (new Date(todayDate.getFullYear(), todayDate.getMonth(), 15).valueOf() / 1000).toString(),
        "Event Timezone": "Asia/Kolkata",
        "Location": "India",
        "URL": "https://india.wordcamp.org/2021/",
        "Twitter": "wordcampin",
        "WordCamp Hashtag": "#WordCampIndia",
        "Number of Anticipated Attendees": "1000",
        "Organizer Name": "Alexander Gounder",
        "WordPress.org Username": "gounder",
        "Virtual event only": "1",
        "Host region": "India",
        "Venue Name": "",
        "Physical Address": "",
        "Maximum Capacity": "",
        "Available Rooms": "",
        "Website URL": "",
        "Exhibition Space Available": "",
        "_venue_coordinates": "",
        "_venue_city": "",
        "_venue_state": "",
        "_venue_country_code": "",
        "_venue_country_name": "",
        "_venue_zip": "",
        "_host_coordinates": {
            "latitude": 20.593684,
            "longitude": 78.96288
        },
        "_host_city": "",
        "_host_state": "",
        "_host_country_code": "IN",
        "_host_country_name": "India",
        "_host_zip": "",
        "session_start_time": 0,
        "_links": {
            "self": [{
                "href": "https://central.wordcamp.org/wp-json/wp/v2/wordcamps/3098905"
            }],
            "collection": [{
                "href": "https://central.wordcamp.org/wp-json/wp/v2/wordcamps"
            }],
            "about": [{
                "href": "https://central.wordcamp.org/wp-json/wp/v2/types/wordcamp"
            }],
            "author": [{
                "embeddable": true,
                "href": "https://central.wordcamp.org/wp-json/wp/v2/users/3201356"
            }],
            "version-history": [{
                "count": 5,
                "href": "https://central.wordcamp.org/wp-json/wp/v2/wordcamps/3098905/revisions"
            }],
            "predecessor-version": [{
                "id": 3135123,
                "href": "https://central.wordcamp.org/wp-json/wp/v2/wordcamps/3098905/revisions/3135123"
            }],
            "wp:featuredmedia": [{
                "embeddable": true,
                "href": "https://central.wordcamp.org/wp-json/wp/v2/media/3134813"
            }],
            "wp:attachment": [{
                "href": "https://central.wordcamp.org/wp-json/wp/v2/media?parent=3098905"
            }],
            "curies": [{
                "name": "wp",
                "href": "https://api.w.org/{rel}",
                "templated": true
            }]
        }
    }
    const wrapper = mount(<Calendar eventsData={[singleEvent]} />)
    const calTable = wrapper.find('.cal-table')
    const calTableBody = calTable.find('tbody')
    console.log(calTableBody.text())
    expect(calTableBody.text().includes(singleEvent.title.rendered)).toEqual(true)
})