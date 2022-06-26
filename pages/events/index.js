import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import Pagination from '@/components/Pagination'
import { API_URL, PER_PAGE } from '@/config/index'
import qs from 'qs';

export default function EventsPage({ events, page, total }) {
    return (
        <Layout>
            <h1>Events</h1>
            {events?.length === 0 && <h3>No events found</h3>}
            {events?.map(evt => (
                <EventItem key={evt.id} evt={evt} />
            ))}
            <Pagination page={page} total={total} />
        </Layout>
    )
}



export async function getServerSideProps({ query: { page = 1 } }) {
    console.log(page)
    // Calculate start page
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

    // pagination
    const query = qs.stringify({
        pagination: {
            start: start,
            limit: PER_PAGE,
        }
    })

    // Fetch events
    const res = await fetch(
        `${API_URL}/api/events?populate=*&sort[0]=date&${query}`
    )
    const events = await res.json()

    return {
        props: { events: events.data, page: +page, total: events.meta.pagination.total },

    }
}