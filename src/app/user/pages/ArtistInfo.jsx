import React, { useEffect, useState } from 'react'
import api from '../../../scripts/api'

const ArtistInfo = ({ currentMusic }) => {

  const [top3, setTop3] = useState([])

  const getArtist = async () => {
    try {
      const res = await api.get(`/user/getTop3/${currentMusic?.artist}`)
      setTop3(res?.data || [])
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (currentMusic) getArtist()
  }, [currentMusic])

  return (
    <div className="artist-info">

      <div className="artist-bubbles">

        {
          top3?.map((e, index, arr) => {

            return <img
              key={index}
              src={e.musicCover}
              alt=""
              className={`artist-bubble 
                ${arr?.length === 1 ? 'center not-3' :
                  arr?.length === 2 && index === 0 ? 'left not-3 is-2' :
                    arr?.length === 2 && index === 1 ? 'right not-3 is-2' :
                      arr?.length === 3 && index === 0 ? 'left' :
                        arr?.length === 3 && index === 1 ? 'center' :
                          arr?.length === 3 && index === 2 ? 'right' : ''}
                `}
            />

          })
        }

        <h1 className="artist-name">
          {currentMusic?.artist}
        </h1>

      </div>

    </div>
  )
}

export default ArtistInfo