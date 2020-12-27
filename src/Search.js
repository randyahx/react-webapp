import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('');
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php?', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                }
            });
            console.log(response);
            setResponse(data.query.search);
        };

        // Check if it's the first render -> search immediately without timeout delay
        if (term && !response.length) {
            search();
        } else {
            // Set timeout delay for subsequent searches
            const timeoutId = setTimeout(() => {
                if (term) {
                    search();
                }
            }, 500);
            // This function is only called the next time useEffect is called
            return () => {
                clearTimeout(timeoutId);
            }
        }
    }, [term]);


    const renderedResponse = response.map(data => {
        return (
            <div key={data.pageid} className='item'>
                <div className='right floated content'>
                <a className='ui button' href={`https://en.wikipedia.org?curid=${data.pageid}`}>
                    Go
                </a>
                </div>
                <div className='content'>
                    <div className='header'>
                        {data.title}
                    </div>
                    {data.snippet}
                </div>
            </div>
        )
    })

  return (
      <div>
          <div className='ui form'>
            <div className='field'>
                <label>Enter search term: </label>
                <input value={term} onChange={(e) => setTerm(e.target.value)} className='input'/>
            </div>
          </div>
          <div className='ui celled list'>
              {renderedResponse}
          </div>
      </div>
  );
}

export default Search;
