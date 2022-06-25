import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                {evt?.attributes?.image &&
                    <Image
                        src={evt?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url || '/public/images/event-default.png'}
                        width={170}
                        height={100}
                    />}
            </div>
            <div className={styles.info}>
                <span>
                    {new Date(evt?.attributes?.date).toLocaleDateString('en-US')} at {evt?.attributes?.time}
                </span>
                <h3>{evt?.attributes?.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/events/${evt?.id}`}>
                    <a className="btn">Details</a>
                </Link>
            </div>
        </div>
    )
}