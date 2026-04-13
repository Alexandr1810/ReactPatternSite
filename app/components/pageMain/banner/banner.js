import Banner_Item from './banner_item';

function Banner(props){
    const banner_items = props.banner_items.filter(item => item.visible)

    console.log(banner_items)
    return(
        <section className='banner'>
            <h2 className='banner-title'>Интернет, который <br /> изменит вашу жизнь</h2>
            <div className='banner-content'>
                {
                    banner_items.map((banner_item, index) => (
                        <Banner_Item banner_item={banner_item} key={index} />
                    ))
                }
            </div>
        </section>
    )
}
export default Banner;