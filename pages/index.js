import Layout from "@/components/Layout";
import Link from "next/link";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function HomePage({ events }) {

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events?.length === 0 && <h3>No events found</h3>}
      {events?.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events?.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  );
}

// TODO change url to be sorted by date
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&sort[0]=date`);
  const events = await res.json();

  return {
    props: { events: events.data.slice(0, 3) },
    revalidate: 1,
  }
}
