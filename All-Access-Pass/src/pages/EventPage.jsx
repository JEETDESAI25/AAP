import "/Users/jd/Documents/Web Dev/AAP/All-Access-Pass/src/styles/EventPage.css";

const events = [
  {
    title: "Event 1",
    date: "2023-06-10",
    description: "This is a description of Event 1.",
    image:
      "https://imgresizer.eurosport.com/unsafe/2560x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2014/05/25/1243778-26866391-2560-1440.jpg",
  },
  {
    title: "Event 2",
    date: "2023-07-15",
    description: "This is a description of Event 2.",
    image:
      "https://c8.alamy.com/comp/2GHA04W/real-madrid-fans-during-the-uefa-champions-league-semi-final-2nd-leg-match-at-the-santiago-bernabeu-stadium-photo-credit-should-read-philip-oldhamsportimage-via-pa-images-2GHA04W.jpg",
  },
  {
    title: "Event 3",
    date: "2023-08-05",
    description: "This is a description of Event 3.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI64PL89mAx2q9TwbNa4-CynbrkPmG3mN6BQ&usqp=CAU",
  },
];

const EventPage = () => {
  return (
    <div className="event-page">
      <h2>Upcoming Events</h2>
      <div className="events-container">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-image-container">
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />
            </div>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-date">{event.date}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
