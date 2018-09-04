import React, {Component} from 'react'
import {connect} from 'react-redux'
import jp from 'jsonpath'

import DeleteUser from './DeleteUser'
/* TODO
- send email
*/
class ManageUser extends Component {
    render() {
        const {user, serviceProviders} = this.props
        console.log({_component: 'ManageUser', serviceProviders})
        return (
            <article className='well'>
                <h4>{user.email}</h4>
                <dl className='dl-horizontal'>
                    <dt>Id</dt>
                    <dd>{user.id}</dd>
                    <dt>Email</dt>
                    <dd>{user.email}</dd>
                    <dt>Aangesloten Diensten</dt>
                    <dd>
                        <ul className='list-unstyled'>
                            {serviceProviders.map(serrviceProvider => (
                                <li key={serrviceProvider.id}>{serrviceProvider.name}</li>
                            ))}
                        </ul>
                    </dd>
                </dl>
                {user
                    .places
                    .map(place => ({
                        place,
                        location: jp.query(place, '$.placeAttributes[?(@.type=="tippiq_Tippiq_place_tippiq_location")]')[0].data
                    }))
                    .map(({place, location}) => (
                        <section key={place.id}>
                            <h4>Tippiq Huis met id {place.id}</h4>
                            <dl className='dl-horizontal'>
                                <dt>Adres</dt>
                                <dd>{location.streetName} {location.nr}
                                    {location.letter}
                                    {location.addition}</dd>
                                <dt>Postcode</dt>
                                <dd>{location.zipcodeDigits} {location.zipcodeLetters}</dd>
                                <dt>Plaats</dt>
                                <dd>{location.cityName}</dd>
                                <dt>Provincie</dt>
                                <dd>{location.provinceName}</dd>
                            </dl>
                            <h5>Toestemmingen voor {place.id}</h5>
                            {place
                                .policies
                                .map(policy => (
                                    <dl key={policy.id} className='dl-horizontal'>
                                        <dt>Title</dt>
                                        <dd>{policy.title}</dd>
                                        <dt>Omschrijving</dt>
                                        <dd>{policy.description}</dd>
                                        <dt>Dienst</dt>
                                        <dd>{serviceProviders.filter(({id}) => (policy.serviceProviderId === id))[0].name}</dd>
                                    </dl>
                                ))}
                        </section>
                    ))}
                <h4>Buurtbericht</h4>
                {jp.query(user, '$.hoodSubscriptions[*].userPlaces[*]').map(userPlace => (
                    <div key={userPlace.id}>
                        <dl key={userPlace.id} className='dl-horizontal'>
                            <dt>Tippiq Huis Id</dt><dd>{userPlace.placeId}</dd>
                            <dt>Ingeschakeld</dt><dd>
                                <input type='checkbox' checked={userPlace.emailNotificationsEnabled} disabled />
                            </dd>
                            <dt>Laatst verzonden</dt><dd>{userPlace.emailLastSentAt}</dd>
                        </dl>
                    </div>
                ))}
                <h4>Actions</h4>
                <DeleteUser/>
                {/*<h4>JSON</h4>
                <ReactJson src={user} collapseStringsAfterLength={40}/>*/}
            </article>
        )
    }
}
export default connect(({
    searchUser: {
        serviceProviders,
        user
    }
}) => ({user, serviceProviders}))(ManageUser)