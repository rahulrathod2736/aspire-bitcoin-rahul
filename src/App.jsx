import { Button, Card, Divider } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [previousPrice, setPreviousPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getBitcoinPrice() {
    try {
      setLoading(true);

      // calling api to get data from api endpoint
      // changed size=1 to get only one data
      const resp = await axios.get(
        'https://random-data-api.com/api/address/random_address?size=1'
      );
      if (resp.status === 200) {
        const priceData = resp.data[0];

        if (priceData?.zip_code) {
          if (currentPrice) {
            // if current price is already there then save it into previous price
            setPreviousPrice(currentPrice);
          }
          // updating current price with api data
          setCurrentPrice(priceData?.zip_code);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card style={{ minWidth: '400px' }}>
      <Button
        type="primary"
        onClick={getBitcoinPrice}
        loading={loading}
        style={
          currentPrice
            ? {
                background: '#800080',
              }
            : {}
        }
      >
        {currentPrice ? 'Refresh Bitcoin price' : 'Get Bitcoin Price'}
      </Button>
      {currentPrice ? (
        <>
          <Divider />
          <div className="space-between">
            <div className="font-semibold">Curent Price:</div>
            <div>{currentPrice}</div>
          </div>
        </>
      ) : (
        <></>
      )}
      {previousPrice ? (
        <>
          <Divider />
          <div className="space-between">
            <div className="font-semibold">Previous Price:</div>
            <div>{previousPrice}</div>
          </div>
        </>
      ) : (
        <></>
      )}
    </Card>
  );
}

export default App;
