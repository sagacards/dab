import Styles from './styles.module.css'
import React from 'react'
import { FaInstagram, FaTwitter, FaDiscord } from 'react-icons/fa'
import Button from 'ui/button';
import { Link } from 'react-router-dom';
import { useConnect } from 'stores/connect';

interface Props {
    children?: React.ReactNode;
}

export default function Footer (props : Props) {

    const { connected } = useConnect();
    
    return <div className={Styles.root}>
        <div className={Styles.container}>
            <div className={Styles.section}>
                <div className={Styles.column}>
                    <div className={Styles.title}>The Saga Tarot Network</div>
                    {!connected && <div>
                        <Link to="/connect" state={{ referrer : window.location.pathname }} className="no-fancy"><Button size='small'>Connect</Button></Link>
                    </div>}
                    <div>
                        <div className={Styles.socials}>
                                <a className={Styles.social} href="https://twitter.com/sagacards">
                            <Button size="large" alt>
                                    <FaTwitter />
                            </Button>
                                </a>
                                <a className={Styles.social} href="https://instagram.com/sagacards">
                            <Button size="large" alt>
                                    <FaInstagram />
                            </Button>
                                </a>
                                <a className={Styles.social} href="http://discord.gg/jNgjgvzCGC">
                            <Button size="large" alt>
                                    <FaDiscord />
                            </Button>
                                </a>
                        </div>
                    </div>
                </div>
                <div className={Styles.column}>
                    <div className={Styles.links}>
                        <div className={Styles.smallTitle}>Apps</div>
                        <div>
                            <a href="https://table.saga.cards">Bazaar: The Tarot Marketplace</a>
                        </div>
                        <div>
                            <a href="https://l2jyf-nqaaa-aaaah-qadha-cai.raw.ic0.app">Tarot Apps Directory</a>
                        </div>
                        <div className={Styles.smallTitle}>Info</div>
                        <div>
                            <a href="https://legends.saga.cards">Tarot ✕ Web3</a>
                        </div>
                        <div>
                            <a href="https://legends.saga.cards">Tarot Creators</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Styles.foot}>
                <div>
                    Built with ❤️ on 🔗 Internet Computer
                </div>
                <div>
                    <a target="_blank" href="https://github.com/sagacards/tarot-dab">Source</a>
                </div>
            </div>
        </div>
    </div>
}