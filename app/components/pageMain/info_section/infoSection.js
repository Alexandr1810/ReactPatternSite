
import AdvantagesItem from './advanteges_item'
import ConnectionButton from './connectionButton'


function InfoSection(props) {
  return (
    <section className="infoSection" id='infoSection'>
        <h2 className="infoSection-title">
          Немного о нас
        </h2>
        <div className="advantages" id='advantages'>
          <div className="advantages-container">

              {props.adventages_items.map((item, index) => (
                  <AdvantagesItem 
                    site_config={props.site_config}
                    key={index}
                    index={index}
                    advantagesItem={item}
                    activeCity={props.activeCity} 
                  />
              ))}
              
              <div className="advantages-additianal">
                <div className='advantages-additianal-toForm'>
                  <h3>Как стать частью {props.site_config.genitive_provider_name}?</h3>
                  <ConnectionButton />
                </div>
              </div>
          </div>
        </div>
    </section>
  );
}

export default InfoSection;
