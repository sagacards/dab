import React from 'react'
import Styles from './styles.module.css'
import Navbar from 'ui/navbar';
import Container from 'ui/container';
import Footer from 'ui/footer';
import Table from 'ui/table';

interface Props {};

export default function HomePage (props : Props) {
    
    return <div className="page">
        <Navbar />
        <Container>
            <div className={Styles.message}>
                The following is a list of registered Tarot NFTs. Those certified as decks are guaranteed to be a fully complete deck of tarot cards, compatible with all manner of online tarot apps. Developers can refer to <a target="_blank" href="https://github.com/sagacards/tarot-dab">the SDK</a> to create compatible tarot apps, and artists can reach out to <a target="_blank" href="https://www.instagram.com/sagacards/">@sagacards</a> on insta to release a deck.
            </div>
            <Table />
        </Container>
        <Footer />
    </div>
};