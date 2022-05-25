import Styles from './styles.module.css'
import React from 'react'
import Button from 'ui/button'
import SchemeToggle from 'ui/scheme-toggle'
import { MenuIcon } from 'ui/svgcons'
import Container from 'ui/container'
import { Link } from 'react-router-dom'
import Logo from 'ui/logo'
import LineText from 'ui/line-text'
import Hashatar from 'ui/hashatar'
import { principalToAddress } from 'ictool'
import { useConnect } from 'stores/connect'

interface Props {
    children?: React.ReactNode;
}

export default function Navbar (props : Props) {
    const { connected, principal } = useConnect();
    const nav : {name: string; path: string}[] = [
        // {
        //     name: 'Drops',
        //     path: '/drops',
        // },
        // {
        //     name: 'Collections',
        //     path: '/collections',
        // },
        // {
        //     name: 'Profile',
        //     path: '/profile',
        // },
    ];
    const [open, setOpen] = React.useState<boolean>(false);
    return <div className={Styles.container}>
        <Container>
            <div className={Styles.root}>
                <div className={Styles.logo}>
                    <Link className="no-fancy" to="/">
                        <Logo />
                    </Link>
                    <Link className="no-fancy" to="/">
                        <LineText><div className={Styles.wordmark}>Tarot NFT Directory</div></LineText>
                    </Link>
                </div>
                <div className={[Styles.breakNav, open ? Styles.open : ''].join(' ')}>
                    <div className={Styles.nav}>
                        {nav.map(i => <Link className="no-fancy" to={i.path} key={`navitem${i.name}`}>
                            <div className={Styles.navItem}>
                                {i.name}
                            </div>
                        </Link>)}
                    </div>
                    {connected
                        && <Link to="/account" className="no-fancy">
                            <Button icon={principal && <Hashatar size={'24px'} name={principalToAddress(principal)} />}>
                                Account
                            </Button>
                        </Link>
                    }
                </div>
                <div className={Styles.aside}>
                    <div className={Styles.scheme}><SchemeToggle /></div>
                    <div className={Styles.breakNavToggle}><Button flush onClick={() => setOpen(!open)}><MenuIcon /></Button></div>
                </div>
            </div>
        </Container>
    </div>
}
