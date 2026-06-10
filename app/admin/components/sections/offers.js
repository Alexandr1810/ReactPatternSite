import React, {useState, useEffect, useRef} from 'react'
import OfferRow from './offerRow'
import UploadOffers from './UploadOffers'
import axios from "axios";
import {server_config} from '@/app/utils/server_config'

function Offers(props) {
  const rowsRef = React.useRef({});

  const [cities_list, setCities_list] = useState([])
  const [additionals, setAdditionals] = useState([])
  const [allOffers_plans, setAllOffers_plans] = useState([])
  
  useEffect(()=>{
    setCities_list([...props.cities_list])
    setAdditionals([...props.additionals])
    setAllOffers_plans([...props.allOffers_plans.sort((a, b) => a.position - b.position)])
  },[props.cities_list, props.additionals, props.allOffers_plans])


  function getAdditionalById(id){
    console.log(id)
    console.log(props.additionals)
    return props.additionals.find((item) => item.id === id)
  }
  function delOffer(id){
    setAllOffers_plans(prev =>
      prev.filter(offer => offer.id !== id)
    )
    delete rowsRef.current[id];
  }
  function addOffer(){
    setAllOffers_plans(prev =>{
      const maxId = prev.length
      ? Math.max(...prev.map(p => p.id))
      : -1;
      const maxPosition = prev.length
      ? Math.max(...prev.map(p => p.position))
      : -1;

      return [...prev, {
        id: maxId + 1,
        position: maxPosition+1,
        name: "",
        services: [],
        speed: 0,
        tv: 0,
        price: 0,
        sim_gb: 0,
        sim_min: 0,
        sim_sms: 0,
        discount_price: 0,
        discount_period: 0,
        discount_description: "",
        connection_price: 0,
        plan_additionals: [],
        cities: prev[prev.length-1] ? prev[prev.length-1].cities : [],
        bestOffer: 0,
        router_conditions: prev[prev.length-1] ? prev[prev.length-1].router_conditions : "",
        pristavka_conditions: prev[prev.length-1] ?  prev[prev.length-1].pristavka_conditions : "",
        needRouter: false,
        needPristavka: false
      }]}
    )
  }
  async function saveOffers() {
    const result = allOffers_plans.map(plan => {
      const getData = rowsRef.current[plan.id];

      const rowData = getData ? getData() : {};

      return {
        ...rowData,
        position: plan.position, // берём из родителя
        id: plan.id              // на всякий случай фиксируем id
      };
    });
    console.log(result);
    setAllOffers_plans(result);

    
    try{
        console.log(result)
        const isValid = props.validateRequiredFields(result, ['name', 'services', 'speed', 'tv', 'discount_price', 'discount_period', 'connection_price']);

        if (!isValid) {
            alert(`Не все поля заполнены!`)
            return;
        }
        await axios.post(`${server_config.api_protocol}://${server_config.site_folder}/back/update/offers/${server_config.site_key}`, {
            offers: result,
        },{
            withCredentials: true
        }).then((response) => {
            console.log(response)
            props.showAlert("successAlert")
        }).catch((error) => {
            console.error(error)
            props.showAlert("errorAlert")
        })
    }
    catch(error){
        console.error(error)
        props.showAlert("errorAlert")
    }
  }
  function setPosition(id, direction){
    setAllOffers_plans((prev) => {
        const currentIndex = prev.findIndex(item => item.id === id);

        if (currentIndex === -1) return prev;

        // Определяем индекс для обмена
        const swapIndex =
            direction === 0
                ? currentIndex - 1   // вверх
                : currentIndex + 1;  // вниз

        // Проверка границ массива
        if (swapIndex < 0 || swapIndex >= prev.length) {
            return prev;
        }

        const currentItem = prev[currentIndex];
        const swapItem = prev[swapIndex];

        // Меняем position
        const updated = prev.map((item, index) => {
            if (index === currentIndex) {
                return { ...item, position: swapItem.position };
            }
            if (index === swapIndex) {
                return { ...item, position: currentItem.position };
            }
            return item;
        });

        // Сортируем по position
        return [...updated].sort((a, b) => a.position - b.position);
    });
  }
  return (
    <section>
        <h2 className='sectionTitle'>Список тарифов</h2>
        <div className='sectionContent' id="offers">
          <div className='offers-data'>
              <h3>Тарифы</h3>
              {allOffers_plans.map((item)=>(
                <OfferRow
                  key={item.id}
                  item={item}
                  setPosition={setPosition}
                  delOffer={delOffer}
                  getAdditionalById={getAdditionalById}
                  cities_list={cities_list}
                  additionals={additionals}
                  register={(id, getData) => {
                    rowsRef.current[id] = getData;
                  }}
                />
              ))}
          </div>
          <div className='cities-buttons'>
            <button className='addIcon-Button' onClick={addOffer}></button>
            <button type='button' className='saveIcon-Button' onClick={saveOffers}></button>
          </div>
        </div>
        <UploadOffers setAllOffers_plans={setAllOffers_plans} />
        
    </section>
  );
}


export default Offers;