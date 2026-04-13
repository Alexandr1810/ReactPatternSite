import Link from "next/link";

function CityModal_Item({city, activeCity, cities_list_original}){
    return(
        <Link href={`/${cities_list_original.find(item => item.city === city).code}`} className={city === activeCity.city ? 'city-block active' : 'city-block'}>{city}</Link>

    )
}
export default CityModal_Item;