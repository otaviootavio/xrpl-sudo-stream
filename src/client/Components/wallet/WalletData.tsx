import React from 'react'

type Data = {
    publicKey: string,
    privateKey: string,
    classicAddress: string,
    seed: string,
  }

type Props = {
    data: Data,
}

const WalletData = (props: Props) => {
  return (
    <form>
        <label>classicAddress <input readOnly type="text" value={props.data.classicAddress} /></label>
        <label>privateKey <input readOnly type="text" value={props.data.privateKey} /></label>
        <label>publicKey <input readOnly type="text" value={props.data.publicKey} /></label>
        <label>seed <input readOnly type="text" value={props.data.seed} /></label>
    </form>
  )
}

export default WalletData