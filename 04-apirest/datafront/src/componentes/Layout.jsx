import PropTypes from 'prop-types';


function Layout({children}) {
    return ( 
        <>
            <header>
                { children }
            </header>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};


export default Layout;