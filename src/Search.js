import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = ({onSearchSubmit}) => {
    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (term) {
            setDebouncedTerm(term);
            }
        }, 1000);

        return () => {
            clearTimeout(timerId);
        }   }, [term]);

    useEffect(() => { const search = async () => {
        if (!debouncedTerm || debouncedTerm==='') {
            return [];
        }
        const {data} = await axios.get('https://en.wikipedia.org/w/api.php?', {
            params: {
                action: 'query',
                list: 'search',
                origin: '*',
                format: 'json',
                srsearch: debouncedTerm,
            }
        })
        setResponse(data.query.search);
    };
        search();
    }, [debouncedTerm]);
    //
    // useEffect(() => {
    //     onSearchSubmit(response);
    // }, [response]);


    // console.log(term);
    // console.log(debouncedTerm);

    // 1. Set debounced term on search term


    // 2. Call api with debounced term instead of search term input

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
