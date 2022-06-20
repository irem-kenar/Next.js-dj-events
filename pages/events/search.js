import qs from 'qs';
import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"

export default function SearchPage({ events }) {
    return (
        <Layout>
            <h1>Events</h1>
            {events?.length === 0 && <h3>No events found</h3>}
            {events?.map(evt => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    )
}

// TODO change url to be sorted by date
export async function getServerSideProps({ query: { term } }) {
    const query = qs.stringify({
        filters: {
            $or: [{
                name: {
                    $containsi: term,
                }
            },
            {
                perfomers: {
                    $containsi: term,
                }
            },
            {
                description: {
                    $containsi: term,
                }
            },
            {
                venue: {
                    $containsi: term,
                }
            }]
        },
    });
    //TODO fix the url
    const res = await fetch(`${API_URL}/api/events?populate=*&sort[0]=date&${query}`);
    const events = await res.json();

    return {
        props: { events: events.data },
    }
}