const path = require('path')
const hasha = require('hasha')
const fs = require('fs-extra')
const jsYaml = require('js-yaml')
jest.setTimeout(60 * 1000) // in milliseconds

describe('Check to ensure the files are generated with the correct file names:', () => {
  const paths = [
    ['build/srcASYNC2/srcASYNC2_1.0.1.yml', '3fc5db29e653a5f6e816ca65720a3a99'],
    ['build/builtOA2_std/builtOA2_std_1.0.1.yml', '11470a2cbe1cf278551e996ce777892c'],
    ['build/builtOA2_readonly/builtOA2_readonly_1.0.1.yml', '5051492748b28a0a5cec1f0b16c3ba78'],
    ['build/builtOA2_no_version/builtOA2_no_version.yml', '11470a2cbe1cf278551e996ce777892c'],
    ['build/builtOA3_std/builtOA3_1.0.1.yml', '3af08fac9d2500ca3ddf431adeece189'],
    ['build/builtOA3_exclude/builtOA3.yml', '3af08fac9d2500ca3ddf431adeece189'],
    ['build/builtOA2_inject/api_1.0.1.yml', '5cf12a88ce2eb18dda109c9e6c475a04'],
  ]

  it('Check all files have been created', (done) => {
    for (let i = 0; i < paths.length; ++i) {
      const filePath = paths[i][0]
      if (!fs.pathExistsSync(filePath)) {
        done('Not found filePath: ' + filePath)
      }
    }
    done()
  })

  it('Should have the correct file hashes', async (done) => {
    // If these tests fail the either:
    // A) The test_swagger.yml has changed
    // B) The tpl for the typescipt server has change
    // C) Something broke when building the said files
    const mismatched = []
    for (let i = 0; i < paths.length; ++i) {
      const filePath = paths[i][0]
      const fileHash = paths[i][1]
      const hash = await hasha.fromFile(path.join(process.cwd(), filePath), { algorithm: 'md5' })
      if (hash !== fileHash) {
        const wrong = `Hash mis-match for file ${filePath}. Expected hash ${fileHash} but got ${hash}`
        mismatched.push(wrong)
      }
    }
    if (mismatched.length > 0) {
      done(mismatched)
    } else {
      done()
    }
  })

  it('built srcASYNC2_1.0.1.yml', async () => {
    const infile = jsYaml.safeLoad(fs.readFileSync('build/srcASYNC2/srcASYNC2_1.0.1.yml', 'utf8'))
    expect(infile.asyncapi).toBe('2.0.0')
    expect(infile.info.title).toBe('boats')
    expect(infile.info.version).toBe('1.0.1')
    expect(infile.info.description).toBe('Beautiful Open / Async Template System - Write less yaml with BOATS and Nunjucks.')
    expect(infile.info.license.name).toBe('Apache 2.0')
    expect(infile.info.license.url).toBe('https://www.apache.org/licenses/LICENSE-2.0')
    expect(infile.defaultContentType).toBe('application/json')
    expect(infile.channels['/ms-auth/cache-connection'].description).toBe('When a new connection change occurs the new cache values are emitted in the payload')
    expect(infile.channels['/ms-auth/cache-connection'].publish.operationId).toBe('msAuthCacheConnection')
    expect(infile.channels['/ms-auth/cache-connection'].publish.message.contentType).toBe('application/json')
    expect(infile.channels['/ms-auth/cache-connection'].publish.message.payload.$ref).toBe('#/components/schemas/MsAuthCacheConnection')
    expect(infile.channels['/ms-auth/cache-connection'].subscribe.operationId).toBe('msAuthCacheConnection')
    expect(infile.channels['/ms-auth/cache-connection'].subscribe.message.contentType).toBe('application/json')
    expect(infile.channels['/ms-auth/cache-connection'].subscribe.message.payload.$ref).toBe('#/components/schemas/MsAuthCacheConnection')
    expect(infile.channels['/ms-auth/cache-user'].description).toBe('When a new connection change occurs the new cache values are emitted in the payload')
    expect(infile.channels['/ms-auth/cache-user'].publish.operationId).toBe('msAuthCacheUser')
    expect(infile.channels['/ms-auth/cache-user'].publish.message.contentType).toBe('application/json')
    expect(infile.channels['/ms-auth/cache-user'].publish.message.payload.$ref).toBe('#/components/schemas/MsAuthCacheUser')
    expect(infile.channels['/ms-auth/cache-user'].subscribe.operationId).toBe('msAuthCacheUser')
    expect(infile.channels['/ms-auth/cache-user'].subscribe.message.contentType).toBe('application/json')
    expect(infile.channels['/ms-auth/cache-user'].subscribe.message.payload.$ref).toBe('#/components/schemas/MsAuthCacheUser')
    expect(infile.components.schemas.MsAuthCacheConnection.type).toBe('object')
    expect(infile.components.schemas.MsAuthCacheConnection.properties.username.type).toBe('string')
    expect(infile.components.schemas.MsAuthCacheConnection.properties.connections.type).toBe('array')
    expect(infile.components.schemas.MsAuthCacheConnection.properties.connections.items.type).toBe('object')
    expect(infile.components.schemas.MsAuthCacheConnection.properties.connections.items.properties.updated.type).toBe('string')
    expect(infile.components.schemas.MsAuthCacheConnection.properties.connections.items.properties.updated.format).toBe('date')
    expect(infile.components.schemas.MsAuthCacheConnection.properties.connections.items.properties.state.type).toBe('string')
    expect(infile.components.schemas.MsAuthCacheConnection.properties.connections.items.properties.username.type).toBe('string')
    expect(infile.components.schemas.MsAuthCacheUser.type).toBe('object')
    expect(infile.components.schemas.MsAuthCacheUser.properties.username.type).toBe('string')
    expect(infile.components.schemas.MsAuthCacheUser.properties.email.type).toBe('string')
  })

  it('built builtOA2_std_1.0.1.yml', async () => {
    const infile = jsYaml.safeLoad(fs.readFileSync('build/builtOA2_std/builtOA2_std_1.0.1.yml', 'utf8'))
    expect(infile.swagger).toBe('2.0')
    expect(infile.info.version).toBe('1.0.1')
    expect(infile.info.title).toBe('boats')
    expect(infile.info.description).toBe('A sample API')
    expect(infile.info.contact.name).toBe('Swagger API Team')
    expect(infile.info.contact.email).toBe('john@boats.io')
    expect(infile.info.contact.url).toBe('https://github.com/johndcarmichael/boats/')
    expect(infile.info.license.name).toBe('Apache 2.0')
    expect(infile.info.license.url).toBe('https://www.apache.org/licenses/LICENSE-2.0.html')
    expect(infile.schemes[0]).toBe('https')
    expect(infile.host).toBe('api.example.com')
    expect(infile.basePath).toBe('/v1')
    expect(infile.securityDefinitions.jwtToken.type).toBe('apiKey')
    expect(infile.securityDefinitions.jwtToken.in).toBe('header')
    expect(infile.securityDefinitions.jwtToken.name).toBe('authorization')
    expect(infile.securityDefinitions.apiKey.type).toBe('apiKey')
    expect(infile.securityDefinitions.apiKey.in).toBe('header')
    expect(infile.securityDefinitions.apiKey.name).toBe('x-api-key')
    expect(infile.paths['/weather/'].get.tags[0]).toBe('weather')
    expect(infile.paths['/weather/'].get.summary).toBe('weather search')
    expect(infile.paths['/weather/'].get.description).toBe('Search for weather objects')
    expect(infile.paths['/weather/'].get.operationId).toBe('v1WeatherGet')
    expect(infile.paths['/weather/'].get['x-filename']).toBe('get')
    expect(infile.paths['/weather/'].get.parameters[0].$ref).toBe('#/parameters/QueryOffset')
    expect(infile.paths['/weather/'].get.parameters[1].$ref).toBe('#/parameters/QueryTextSearch')
    expect(infile.paths['/weather/'].get.parameters[2].$ref).toBe('#/parameters/HeaderSearchId')
    expect(infile.paths['/weather/'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.meta.$ref).toBe('#/definitions/GenericSearchMeta')
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.data.type).toBe('array')
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.data.items.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.paths['/weather/'].get.responses[404].description).toBe('Path & method combination not found')
    expect(infile.paths['/weather/'].post.tags[0]).toBe('weather')
    expect(infile.paths['/weather/'].post.summary).toBe('weather data')
    expect(infile.paths['/weather/'].post.description).toBe('Create a new weather record.')
    expect(infile.paths['/weather/'].post.operationId).toBe('v1WeatherPost')
    expect(infile.paths['/weather/'].post.parameters[0].in).toBe('body')
    expect(infile.paths['/weather/'].post.parameters[0].name).toBe('v1WeatherPost')
    expect(infile.paths['/weather/'].post.parameters[0].description).toBe('Optional description in *Markdown*')
    expect(infile.paths['/weather/'].post.parameters[0].required).toBe(true)
    expect(infile.paths['/weather/'].post.parameters[0].schema.$ref).toBe('#/definitions/WeatherPost')
    expect(infile.paths['/weather/'].post.responses[200].description).toBe('Successful temp creation')
    expect(infile.paths['/weather/'].post.responses[200].schema.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.paths['/weather/'].post.responses[422].description).toBe('Invalid form data provided')
    expect(infile.paths['/weather/id/{id}'].get.tags[0]).toBe('weather')
    expect(infile.paths['/weather/id/{id}'].get.summary).toBe('One weather object')
    expect(infile.paths['/weather/id/{id}'].get.description).toBe('Get the full weather object')
    expect(infile.paths['/weather/id/{id}'].get.operationId).toBe('v1WeatherIdGet')
    expect(infile.paths['/weather/id/{id}'].get.produces[0]).toBe('application/json')
    expect(infile.paths['/weather/id/{id}'].get.parameters[0].$ref).toBe('#/parameters/PathId')
    expect(infile.paths['/weather/id/{id}'].get.parameters[1].$ref).toBe('#/parameters/HeaderSearchId')
    expect(infile.paths['/weather/id/{id}'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/id/{id}'].get.responses[200].schema.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.paths['/weather/id/{id}'].get.responses[404].description).toBe('Path & method combination not found')
    expect(infile.paths['/weather/id/{id}'].put.tags[0]).toBe('weather')
    expect(infile.paths['/weather/id/{id}'].put.summary).toBe('weather data')
    expect(infile.paths['/weather/id/{id}'].put.description).toBe('Create a new weather record.')
    expect(infile.paths['/weather/id/{id}'].put.operationId).toBe('v1WeatherIdPut')
    expect(infile.paths['/weather/id/{id}'].put.produces[0]).toBe('application/json')
    expect(infile.paths['/weather/id/{id}'].put.parameters[0].$ref).toBe('#/parameters/PathId')
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].in).toBe('body')
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].name).toBe('v1WeatherIdPut')
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].description).toBe('Optional description in *Markdown*')
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].required).toBe(true)
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].schema.$ref).toBe('#/definitions/WeatherIdPut')
    expect(infile.paths['/weather/id/{id}'].put.responses[200].description).toBe('Successful temp creation')
    expect(infile.paths['/weather/id/{id}'].put.responses[200].schema.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.paths['/weather/id/{id}'].put.responses[422].description).toBe('Invalid form data provided')
    expect(infile.paths['/weather/latest'].get.tags[0]).toBe('weather')
    expect(infile.paths['/weather/latest'].get.summary).toBe('lastest weather data')
    expect(infile.paths['/weather/latest'].get.description).toBe('Get the latest temperatures')
    expect(infile.paths['/weather/latest'].get.operationId).toBe('v1WeatherLatestGet')
    expect(infile.paths['/weather/latest'].get.produces[0]).toBe('application/json')
    expect(infile.paths['/weather/latest'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/latest'].get.responses[200].schema.$ref).toBe('#/definitions/WeatherModels')
    expect(infile.paths['/weather/latest'].get.responses[404].description).toBe('Temp not found')
    expect(infile.parameters.HeaderSearchId.in).toBe('header')
    expect(infile.parameters.HeaderSearchId.name).toBe('Search-Id')
    expect(infile.parameters.HeaderSearchId.type).toBe('string')
    expect(infile.parameters.HeaderSearchId.description).toBe('Unique search {id}')
    expect(infile.parameters.HeaderSearchId['x-example']).toBe('569eecd9-9962-4aed-a0f0-30476c6a82ed')
    expect(infile.parameters.PathId.in).toBe('path')
    expect(infile.parameters.PathId.name).toBe('id')
    expect(infile.parameters.PathId.type).toBe('integer')
    expect(infile.parameters.PathId.required).toBe(true)
    expect(infile.parameters.PathId.description).toBe('Numeric ID of object to fetch')
    expect(infile.parameters.QueryOffset.in).toBe('query')
    expect(infile.parameters.QueryOffset.name).toBe('offset')
    expect(infile.parameters.QueryOffset.required).toBe(false)
    expect(infile.parameters.QueryOffset.type).toBe('integer')
    expect(infile.parameters.QueryOffset.description).toBe('The number of items to skip before starting to collect the result set.')
    expect(infile.parameters.QueryTextSearch.in).toBe('query')
    expect(infile.parameters.QueryTextSearch.name).toBe('textSearch')
    expect(infile.parameters.QueryTextSearch.required).toBe(false)
    expect(infile.parameters.QueryTextSearch.type).toBe('string')
    expect(infile.parameters.QueryTextSearch.description).toBe('Search string to query')
    expect(infile.definitions.GenericSearchMeta.properties.totalResultCount.type).toBe('number')
    expect(infile.definitions.GenericSearchMeta.properties.offset.type).toBe('number')
    expect(infile.definitions.GenericSearchMeta.properties.limit.type).toBe('number')
    expect(infile.definitions.WeatherIdPut.allOf[0].$ref).toBe('#/definitions/WeatherPost')
    expect(infile.definitions.WeatherIdPut.allOf[1].type).toBe('object')
    expect(infile.definitions.WeatherIdPut.allOf[1].properties.id.type).toBe('integer')
    expect(infile.definitions.WeatherModel.type).toBe('object')
    expect(infile.definitions.WeatherModel.properties.id.type).toBe('integer')
    expect(infile.definitions.WeatherModel.properties.date.type).toBe('string')
    expect(infile.definitions.WeatherModel.properties.date.format).toBe('date')
    expect(infile.definitions.WeatherModel.properties.location.type).toBe('string')
    expect(infile.definitions.WeatherModel.properties.cloudCoverPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherModel.properties.humidityPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherModel.properties.temperature.type).toBe('number')
    expect(infile.definitions.WeatherModels.type).toBe('array')
    expect(infile.definitions.WeatherModels.items.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.definitions.WeatherPost.type).toBe('object')
    expect(infile.definitions.WeatherPost.properties.date.type).toBe('string')
    expect(infile.definitions.WeatherPost.properties.date.format).toBe('date')
    expect(infile.definitions.WeatherPost.properties.location.type).toBe('string')
    expect(infile.definitions.WeatherPost.properties.cloudCoverPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherPost.properties.humidityPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherPost.properties.temperature.type).toBe('number')
  })

  it('built builtOA2_readonly_1.0.1.yml', async () => {
    const infile = jsYaml.safeLoad(fs.readFileSync('build/builtOA2_readonly/builtOA2_readonly_1.0.1.yml', 'utf8'))
    expect(infile.swagger).toBe('2.0')
    expect(infile.info.version).toBe('1.0.1')
    expect(infile.info.title).toBe('boats')
    expect(infile.info.description).toBe('A sample API')
    expect(infile.info.contact.name).toBe('Swagger API Team')
    expect(infile.info.contact.email).toBe('john@boats.io')
    expect(infile.info.contact.url).toBe('https://github.com/johndcarmichael/boats/')
    expect(infile.info.license.name).toBe('Apache 2.0')
    expect(infile.info.license.url).toBe('https://www.apache.org/licenses/LICENSE-2.0.html')
    expect(infile.host).toBe('api.example.com')
    expect(infile.basePath).toBe('/v1')
    expect(infile.schemes[0]).toBe('https')
    expect(infile.paths['/weather/'].get.tags[0]).toBe('weather')
    expect(infile.paths['/weather/'].get.summary).toBe('weather search')
    expect(infile.paths['/weather/'].get.description).toBe('Search for weather objects')
    expect(infile.paths['/weather/'].get.operationId).toBe('v1WeatherGet')
    expect(infile.paths['/weather/'].get['x-filename']).toBe('get')
    expect(infile.paths['/weather/'].get.parameters[0].$ref).toBe('#/parameters/QueryOffset')
    expect(infile.paths['/weather/'].get.parameters[1].$ref).toBe('#/parameters/QueryTextSearch')
    expect(infile.paths['/weather/'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.meta.$ref).toBe('#/definitions/GenericSearchMeta')
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.data.type).toBe('array')
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.data.items.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.paths['/weather/'].get.responses[404].description).toBe('Path & method combination not found')
    expect(infile.paths['/weather/id/{id}'].get.tags[0]).toBe('weather')
    expect(infile.paths['/weather/id/{id}'].get.summary).toBe('One weather object')
    expect(infile.paths['/weather/id/{id}'].get.description).toBe('Get the full weather object')
    expect(infile.paths['/weather/id/{id}'].get.operationId).toBe('v1WeatherIdGet')
    expect(infile.paths['/weather/id/{id}'].get.produces[0]).toBe('application/json')
    expect(infile.paths['/weather/id/{id}'].get.parameters[0].$ref).toBe('#/parameters/PathId')
    expect(infile.paths['/weather/id/{id}'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/id/{id}'].get.responses[200].schema.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.paths['/weather/id/{id}'].get.responses[404].description).toBe('Path & method combination not found')
    expect(infile.paths['/weather/latest'].get.tags[0]).toBe('weather')
    expect(infile.paths['/weather/latest'].get.summary).toBe('lastest weather data')
    expect(infile.paths['/weather/latest'].get.description).toBe('Get the latest temperatures')
    expect(infile.paths['/weather/latest'].get.operationId).toBe('v1WeatherLatestGet')
    expect(infile.paths['/weather/latest'].get.produces[0]).toBe('application/json')
    expect(infile.paths['/weather/latest'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/latest'].get.responses[200].schema.$ref).toBe('#/definitions/WeatherModels')
    expect(infile.paths['/weather/latest'].get.responses[404].description).toBe('Temp not found')
    expect(infile.parameters.HeaderSearchId.in).toBe('header')
    expect(infile.parameters.HeaderSearchId.name).toBe('Search-Id')
    expect(infile.parameters.HeaderSearchId.type).toBe('string')
    expect(infile.parameters.HeaderSearchId.description).toBe('Unique search {id}')
    expect(infile.parameters.HeaderSearchId['x-example']).toBe('569eecd9-9962-4aed-a0f0-30476c6a82ed')
    expect(infile.parameters.PathId.in).toBe('path')
    expect(infile.parameters.PathId.name).toBe('id')
    expect(infile.parameters.PathId.type).toBe('integer')
    expect(infile.parameters.PathId.required).toBe(true)
    expect(infile.parameters.PathId.description).toBe('Numeric ID of object to fetch')
    expect(infile.parameters.QueryOffset.in).toBe('query')
    expect(infile.parameters.QueryOffset.name).toBe('offset')
    expect(infile.parameters.QueryOffset.required).toBe(false)
    expect(infile.parameters.QueryOffset.type).toBe('integer')
    expect(infile.parameters.QueryOffset.description).toBe('The number of items to skip before starting to collect the result set.')
    expect(infile.parameters.QueryTextSearch.in).toBe('query')
    expect(infile.parameters.QueryTextSearch.name).toBe('textSearch')
    expect(infile.parameters.QueryTextSearch.required).toBe(false)
    expect(infile.parameters.QueryTextSearch.type).toBe('string')
    expect(infile.parameters.QueryTextSearch.description).toBe('Search string to query')
    expect(infile.definitions.GenericSearchMeta.properties.totalResultCount.type).toBe('number')
    expect(infile.definitions.GenericSearchMeta.properties.offset.type).toBe('number')
    expect(infile.definitions.GenericSearchMeta.properties.limit.type).toBe('number')
    expect(infile.definitions.WeatherIdPut.allOf[0].$ref).toBe('#/definitions/WeatherPost')
    expect(infile.definitions.WeatherIdPut.allOf[1].type).toBe('object')
    expect(infile.definitions.WeatherIdPut.allOf[1].properties.id.type).toBe('integer')
    expect(infile.definitions.WeatherModel.type).toBe('object')
    expect(infile.definitions.WeatherModel.properties.id.type).toBe('integer')
    expect(infile.definitions.WeatherModel.properties.date.type).toBe('string')
    expect(infile.definitions.WeatherModel.properties.date.format).toBe('date')
    expect(infile.definitions.WeatherModel.properties.location.type).toBe('string')
    expect(infile.definitions.WeatherModel.properties.cloudCoverPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherModel.properties.humidityPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherModel.properties.temperature.type).toBe('number')
    expect(infile.definitions.WeatherModels.type).toBe('array')
    expect(infile.definitions.WeatherModels.items.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.definitions.WeatherPost.type).toBe('object')
    expect(infile.definitions.WeatherPost.properties.date.type).toBe('string')
    expect(infile.definitions.WeatherPost.properties.date.format).toBe('date')
    expect(infile.definitions.WeatherPost.properties.location.type).toBe('string')
    expect(infile.definitions.WeatherPost.properties.cloudCoverPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherPost.properties.humidityPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherPost.properties.temperature.type).toBe('number')
  })

  it('built builtOA2_no_version.yml', async () => {
    const infile = jsYaml.safeLoad(fs.readFileSync('build/builtOA2_no_version/builtOA2_no_version.yml', 'utf8'))
    expect(infile.swagger).toBe('2.0')
    expect(infile.info.version).toBe('1.0.1')
    expect(infile.info.title).toBe('boats')
    expect(infile.info.description).toBe('A sample API')
    expect(infile.info.contact.name).toBe('Swagger API Team')
    expect(infile.info.contact.email).toBe('john@boats.io')
    expect(infile.info.contact.url).toBe('https://github.com/johndcarmichael/boats/')
    expect(infile.info.license.name).toBe('Apache 2.0')
    expect(infile.info.license.url).toBe('https://www.apache.org/licenses/LICENSE-2.0.html')
    expect(infile.schemes[0]).toBe('https')
    expect(infile.host).toBe('api.example.com')
    expect(infile.basePath).toBe('/v1')
    expect(infile.securityDefinitions.jwtToken.type).toBe('apiKey')
    expect(infile.securityDefinitions.jwtToken.in).toBe('header')
    expect(infile.securityDefinitions.jwtToken.name).toBe('authorization')
    expect(infile.securityDefinitions.apiKey.type).toBe('apiKey')
    expect(infile.securityDefinitions.apiKey.in).toBe('header')
    expect(infile.securityDefinitions.apiKey.name).toBe('x-api-key')
    expect(infile.paths['/weather/'].get.tags[0]).toBe('weather')
    expect(infile.paths['/weather/'].get.summary).toBe('weather search')
    expect(infile.paths['/weather/'].get.description).toBe('Search for weather objects')
    expect(infile.paths['/weather/'].get.operationId).toBe('v1WeatherGet')
    expect(infile.paths['/weather/'].get['x-filename']).toBe('get')
    expect(infile.paths['/weather/'].get.parameters[0].$ref).toBe('#/parameters/QueryOffset')
    expect(infile.paths['/weather/'].get.parameters[1].$ref).toBe('#/parameters/QueryTextSearch')
    expect(infile.paths['/weather/'].get.parameters[2].$ref).toBe('#/parameters/HeaderSearchId')
    expect(infile.paths['/weather/'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.meta.$ref).toBe('#/definitions/GenericSearchMeta')
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.data.type).toBe('array')
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.data.items.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.paths['/weather/'].get.responses[404].description).toBe('Path & method combination not found')
    expect(infile.paths['/weather/'].post.tags[0]).toBe('weather')
    expect(infile.paths['/weather/'].post.summary).toBe('weather data')
    expect(infile.paths['/weather/'].post.description).toBe('Create a new weather record.')
    expect(infile.paths['/weather/'].post.operationId).toBe('v1WeatherPost')
    expect(infile.paths['/weather/'].post.parameters[0].in).toBe('body')
    expect(infile.paths['/weather/'].post.parameters[0].name).toBe('v1WeatherPost')
    expect(infile.paths['/weather/'].post.parameters[0].description).toBe('Optional description in *Markdown*')
    expect(infile.paths['/weather/'].post.parameters[0].required).toBe(true)
    expect(infile.paths['/weather/'].post.parameters[0].schema.$ref).toBe('#/definitions/WeatherPost')
    expect(infile.paths['/weather/'].post.responses[200].description).toBe('Successful temp creation')
    expect(infile.paths['/weather/'].post.responses[200].schema.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.paths['/weather/'].post.responses[422].description).toBe('Invalid form data provided')
    expect(infile.paths['/weather/id/{id}'].get.tags[0]).toBe('weather')
    expect(infile.paths['/weather/id/{id}'].get.summary).toBe('One weather object')
    expect(infile.paths['/weather/id/{id}'].get.description).toBe('Get the full weather object')
    expect(infile.paths['/weather/id/{id}'].get.operationId).toBe('v1WeatherIdGet')
    expect(infile.paths['/weather/id/{id}'].get.produces[0]).toBe('application/json')
    expect(infile.paths['/weather/id/{id}'].get.parameters[0].$ref).toBe('#/parameters/PathId')
    expect(infile.paths['/weather/id/{id}'].get.parameters[1].$ref).toBe('#/parameters/HeaderSearchId')
    expect(infile.paths['/weather/id/{id}'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/id/{id}'].get.responses[200].schema.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.paths['/weather/id/{id}'].get.responses[404].description).toBe('Path & method combination not found')
    expect(infile.paths['/weather/id/{id}'].put.tags[0]).toBe('weather')
    expect(infile.paths['/weather/id/{id}'].put.summary).toBe('weather data')
    expect(infile.paths['/weather/id/{id}'].put.description).toBe('Create a new weather record.')
    expect(infile.paths['/weather/id/{id}'].put.operationId).toBe('v1WeatherIdPut')
    expect(infile.paths['/weather/id/{id}'].put.produces[0]).toBe('application/json')
    expect(infile.paths['/weather/id/{id}'].put.parameters[0].$ref).toBe('#/parameters/PathId')
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].in).toBe('body')
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].name).toBe('v1WeatherIdPut')
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].description).toBe('Optional description in *Markdown*')
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].required).toBe(true)
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].schema.$ref).toBe('#/definitions/WeatherIdPut')
    expect(infile.paths['/weather/id/{id}'].put.responses[200].description).toBe('Successful temp creation')
    expect(infile.paths['/weather/id/{id}'].put.responses[200].schema.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.paths['/weather/id/{id}'].put.responses[422].description).toBe('Invalid form data provided')
    expect(infile.paths['/weather/latest'].get.tags[0]).toBe('weather')
    expect(infile.paths['/weather/latest'].get.summary).toBe('lastest weather data')
    expect(infile.paths['/weather/latest'].get.description).toBe('Get the latest temperatures')
    expect(infile.paths['/weather/latest'].get.operationId).toBe('v1WeatherLatestGet')
    expect(infile.paths['/weather/latest'].get.produces[0]).toBe('application/json')
    expect(infile.paths['/weather/latest'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/latest'].get.responses[200].schema.$ref).toBe('#/definitions/WeatherModels')
    expect(infile.paths['/weather/latest'].get.responses[404].description).toBe('Temp not found')
    expect(infile.parameters.HeaderSearchId.in).toBe('header')
    expect(infile.parameters.HeaderSearchId.name).toBe('Search-Id')
    expect(infile.parameters.HeaderSearchId.type).toBe('string')
    expect(infile.parameters.HeaderSearchId.description).toBe('Unique search {id}')
    expect(infile.parameters.HeaderSearchId['x-example']).toBe('569eecd9-9962-4aed-a0f0-30476c6a82ed')
    expect(infile.parameters.PathId.in).toBe('path')
    expect(infile.parameters.PathId.name).toBe('id')
    expect(infile.parameters.PathId.type).toBe('integer')
    expect(infile.parameters.PathId.required).toBe(true)
    expect(infile.parameters.PathId.description).toBe('Numeric ID of object to fetch')
    expect(infile.parameters.QueryOffset.in).toBe('query')
    expect(infile.parameters.QueryOffset.name).toBe('offset')
    expect(infile.parameters.QueryOffset.required).toBe(false)
    expect(infile.parameters.QueryOffset.type).toBe('integer')
    expect(infile.parameters.QueryOffset.description).toBe('The number of items to skip before starting to collect the result set.')
    expect(infile.parameters.QueryTextSearch.in).toBe('query')
    expect(infile.parameters.QueryTextSearch.name).toBe('textSearch')
    expect(infile.parameters.QueryTextSearch.required).toBe(false)
    expect(infile.parameters.QueryTextSearch.type).toBe('string')
    expect(infile.parameters.QueryTextSearch.description).toBe('Search string to query')
    expect(infile.definitions.GenericSearchMeta.properties.totalResultCount.type).toBe('number')
    expect(infile.definitions.GenericSearchMeta.properties.offset.type).toBe('number')
    expect(infile.definitions.GenericSearchMeta.properties.limit.type).toBe('number')
    expect(infile.definitions.WeatherIdPut.allOf[0].$ref).toBe('#/definitions/WeatherPost')
    expect(infile.definitions.WeatherIdPut.allOf[1].type).toBe('object')
    expect(infile.definitions.WeatherIdPut.allOf[1].properties.id.type).toBe('integer')
    expect(infile.definitions.WeatherModel.type).toBe('object')
    expect(infile.definitions.WeatherModel.properties.id.type).toBe('integer')
    expect(infile.definitions.WeatherModel.properties.date.type).toBe('string')
    expect(infile.definitions.WeatherModel.properties.date.format).toBe('date')
    expect(infile.definitions.WeatherModel.properties.location.type).toBe('string')
    expect(infile.definitions.WeatherModel.properties.cloudCoverPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherModel.properties.humidityPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherModel.properties.temperature.type).toBe('number')
    expect(infile.definitions.WeatherModels.type).toBe('array')
    expect(infile.definitions.WeatherModels.items.$ref).toBe('#/definitions/WeatherModel')
    expect(infile.definitions.WeatherPost.type).toBe('object')
    expect(infile.definitions.WeatherPost.properties.date.type).toBe('string')
    expect(infile.definitions.WeatherPost.properties.date.format).toBe('date')
    expect(infile.definitions.WeatherPost.properties.location.type).toBe('string')
    expect(infile.definitions.WeatherPost.properties.cloudCoverPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherPost.properties.humidityPercentage.type).toBe('integer')
    expect(infile.definitions.WeatherPost.properties.temperature.type).toBe('number')
  })

  it('built builtOA3_1.0.1.yml', async () => {
    const infile = jsYaml.safeLoad(fs.readFileSync('build/builtOA3_std/builtOA3_1.0.1.yml', 'utf8'))
    expect(infile.openapi).toBe('3.0.0')
    expect(infile.info.version).toBe('1.0.1')
    expect(infile.info.title).toBe('boats')
    expect(infile.info.description).toBe('A sample API')
    expect(infile.info.contact.name).toBe('Swagger API Team')
    expect(infile.info.contact.email).toBe('john@boats.io')
    expect(infile.info.contact.url).toBe('https://github.com/johndcarmichael/boats/')
    expect(infile.info.license.name).toBe('Apache 2.0')
    expect(infile.info.license.url).toBe('https://www.apache.org/licenses/LICENSE-2.0.html')
    expect(infile.servers[0].url).toBe('localhost')
    expect(infile.tags[0].name).toBe('weather')
    expect(infile.tags[0].description).toBe('Weather data')
    expect(infile.paths['/weather'].get.tags[0]).toBe('Weather')
    expect(infile.paths['/weather'].get.summary).toBe('weather data')
    expect(infile.paths['/weather'].get.description).toBe('Get the latest temperatures')
    expect(infile.paths['/weather'].get.operationId).toBe('weatherGet')
    expect(infile.paths['/weather'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather'].get.responses[200].content['application/json'].schema.$ref).toBe('#/components/schemas/Weathers')
    expect(infile.paths['/weather'].get.responses[404].description).toBe('Temp not found')
    expect(infile.paths['/weather'].post.tags[0]).toBe('Weather')
    expect(infile.paths['/weather'].post.summary).toBe('weather data')
    expect(infile.paths['/weather'].post.description).toBe('Create a new weather record.')
    expect(infile.paths['/weather'].post.operationId).toBe('weatherPost')
    expect(infile.paths['/weather'].post.requestBody.description).toBe('Optional description in *Markdown*')
    expect(infile.paths['/weather'].post.requestBody.required).toBe(true)
    expect(infile.paths['/weather'].post.requestBody.content['application/json'].schema.$ref).toBe('#/components/schemas/WeatherPost')
    expect(infile.paths['/weather'].post.responses[200].description).toBe('Successful temp creation')
    expect(infile.paths['/weather'].post.responses[200].content['application/json'].schema.$ref).toBe('#/components/schemas/Weather')
    expect(infile.paths['/weather'].post.responses[422].description).toBe('Invalid form data provided')
    expect(infile.paths['/weather/id/{id}'].get.tags[0]).toBe('Weather')
    expect(infile.paths['/weather/id/{id}'].get.summary).toBe('weather data')
    expect(infile.paths['/weather/id/{id}'].get.description).toBe('Get the latest temperatures')
    expect(infile.paths['/weather/id/{id}'].get.operationId).toBe('weatherIdIdGet')
    expect(infile.paths['/weather/id/{id}'].get.parameters[0].$ref).toBe('#/components/parameters/PathId')
    expect(infile.paths['/weather/id/{id}'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/id/{id}'].get.responses[200].content['application/json'].schema.$ref).toBe('#/components/schemas/Weather')
    expect(infile.paths['/weather/id/{id}'].get.responses[404].description).toBe('Temp not found')
    expect(infile.paths['/weather/id/{id}'].put.tags[0]).toBe('Weather')
    expect(infile.paths['/weather/id/{id}'].put.summary).toBe('weather data')
    expect(infile.paths['/weather/id/{id}'].put.description).toBe('Create a new weather record.')
    expect(infile.paths['/weather/id/{id}'].put.operationId).toBe('weatherIdIdPut')
    expect(infile.paths['/weather/id/{id}'].put.requestBody.description).toBe('Optional description in *Markdown*')
    expect(infile.paths['/weather/id/{id}'].put.requestBody.required).toBe(true)
    expect(infile.paths['/weather/id/{id}'].put.requestBody.content['application/json'].schema.$ref).toBe('#/components/schemas/WeatherPut')
    expect(infile.paths['/weather/id/{id}'].put.responses[200].description).toBe('Successful temp creation')
    expect(infile.paths['/weather/id/{id}'].put.responses[200].content['application/json'].schema.$ref).toBe('#/components/schemas/Weather')
    expect(infile.paths['/weather/id/{id}'].put.responses[422].description).toBe('Invalid form data provided')
    expect(infile.components.parameters.PathId.in).toBe('path')
    expect(infile.components.parameters.PathId.name).toBe('id')
    expect(infile.components.parameters.PathId.schema.type).toBe('integer')
    expect(infile.components.parameters.PathId.required).toBe(true)
    expect(infile.components.parameters.PathId.description).toBe('Numeric ID of object to fetch')
    expect(infile.components.parameters.QueryOffset.in).toBe('query')
    expect(infile.components.parameters.QueryOffset.name).toBe('offset')
    expect(infile.components.parameters.QueryOffset.required).toBe(false)
    expect(infile.components.parameters.QueryOffset.schema.type).toBe('integer')
    expect(infile.components.parameters.QueryOffset.schema.minimum).toBe(0)
    expect(infile.components.parameters.QueryOffset.description).toBe('The number of items to skip before starting to collect the result set.')
    expect(infile.components.schemas.GenericSearchMeta.properties.totalResultCount.type).toBe('number')
    expect(infile.components.schemas.GenericSearchMeta.properties.offset.type).toBe('number')
    expect(infile.components.schemas.GenericSearchMeta.properties.limit.type).toBe('number')
    expect(infile.components.schemas.Weather.type).toBe('object')
    expect(infile.components.schemas.Weather.properties.id.type).toBe('integer')
    expect(infile.components.schemas.Weather.properties.date.type).toBe('string')
    expect(infile.components.schemas.Weather.properties.date.format).toBe('date')
    expect(infile.components.schemas.Weather.properties.location.type).toBe('string')
    expect(infile.components.schemas.Weather.properties.cloudCoverPercentage.type).toBe('integer')
    expect(infile.components.schemas.Weather.properties.humidityPercentage.type).toBe('integer')
    expect(infile.components.schemas.Weather.properties.temperature.type).toBe('number')
    expect(infile.components.schemas.Weathers.type).toBe('object')
    expect(infile.components.schemas.Weathers.properties.meta.$ref).toBe('#/components/schemas/GenericSearchMeta')
    expect(infile.components.schemas.Weathers.properties.data.type).toBe('array')
    expect(infile.components.schemas.Weathers.properties.data.items.$ref).toBe('#/components/schemas/Weather')
    expect(infile.components.schemas.WeatherPost.type).toBe('object')
    expect(infile.components.schemas.WeatherPost.properties.date.type).toBe('string')
    expect(infile.components.schemas.WeatherPost.properties.date.format).toBe('date')
    expect(infile.components.schemas.WeatherPost.properties.location.type).toBe('string')
    expect(infile.components.schemas.WeatherPost.properties.cloudCoverPercentage.type).toBe('integer')
    expect(infile.components.schemas.WeatherPost.properties.humidityPercentage.type).toBe('integer')
    expect(infile.components.schemas.WeatherPost.properties.temperature.type).toBe('number')
    expect(infile.components.schemas.WeatherPut.allOf[0].$ref).toBe('#/components/schemas/WeatherPost')
    expect(infile.components.schemas.WeatherPut.allOf[1].type).toBe('object')
    expect(infile.components.schemas.WeatherPut.allOf[1].properties.id.type).toBe('integer')
  })

  it('built builtOA3.yml', async () => {
    const infile = jsYaml.safeLoad(fs.readFileSync('build/builtOA3_exclude/builtOA3.yml', 'utf8'))
    expect(infile.openapi).toBe('3.0.0')
    expect(infile.info.version).toBe('1.0.1')
    expect(infile.info.title).toBe('boats')
    expect(infile.info.description).toBe('A sample API')
    expect(infile.info.contact.name).toBe('Swagger API Team')
    expect(infile.info.contact.email).toBe('john@boats.io')
    expect(infile.info.contact.url).toBe('https://github.com/johndcarmichael/boats/')
    expect(infile.info.license.name).toBe('Apache 2.0')
    expect(infile.info.license.url).toBe('https://www.apache.org/licenses/LICENSE-2.0.html')
    expect(infile.servers[0].url).toBe('localhost')
    expect(infile.tags[0].name).toBe('weather')
    expect(infile.tags[0].description).toBe('Weather data')
    expect(infile.paths['/weather'].get.tags[0]).toBe('Weather')
    expect(infile.paths['/weather'].get.summary).toBe('weather data')
    expect(infile.paths['/weather'].get.description).toBe('Get the latest temperatures')
    expect(infile.paths['/weather'].get.operationId).toBe('weatherGet')
    expect(infile.paths['/weather'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather'].get.responses[200].content['application/json'].schema.$ref).toBe('#/components/schemas/Weathers')
    expect(infile.paths['/weather'].get.responses[404].description).toBe('Temp not found')
    expect(infile.paths['/weather'].post.tags[0]).toBe('Weather')
    expect(infile.paths['/weather'].post.summary).toBe('weather data')
    expect(infile.paths['/weather'].post.description).toBe('Create a new weather record.')
    expect(infile.paths['/weather'].post.operationId).toBe('weatherPost')
    expect(infile.paths['/weather'].post.requestBody.description).toBe('Optional description in *Markdown*')
    expect(infile.paths['/weather'].post.requestBody.required).toBe(true)
    expect(infile.paths['/weather'].post.requestBody.content['application/json'].schema.$ref).toBe('#/components/schemas/WeatherPost')
    expect(infile.paths['/weather'].post.responses[200].description).toBe('Successful temp creation')
    expect(infile.paths['/weather'].post.responses[200].content['application/json'].schema.$ref).toBe('#/components/schemas/Weather')
    expect(infile.paths['/weather'].post.responses[422].description).toBe('Invalid form data provided')
    expect(infile.paths['/weather/id/{id}'].get.tags[0]).toBe('Weather')
    expect(infile.paths['/weather/id/{id}'].get.summary).toBe('weather data')
    expect(infile.paths['/weather/id/{id}'].get.description).toBe('Get the latest temperatures')
    expect(infile.paths['/weather/id/{id}'].get.operationId).toBe('weatherIdIdGet')
    expect(infile.paths['/weather/id/{id}'].get.parameters[0].$ref).toBe('#/components/parameters/PathId')
    expect(infile.paths['/weather/id/{id}'].get.responses[200].description).toBe('Successful fetch')
    expect(infile.paths['/weather/id/{id}'].get.responses[200].content['application/json'].schema.$ref).toBe('#/components/schemas/Weather')
    expect(infile.paths['/weather/id/{id}'].get.responses[404].description).toBe('Temp not found')
    expect(infile.paths['/weather/id/{id}'].put.tags[0]).toBe('Weather')
    expect(infile.paths['/weather/id/{id}'].put.summary).toBe('weather data')
    expect(infile.paths['/weather/id/{id}'].put.description).toBe('Create a new weather record.')
    expect(infile.paths['/weather/id/{id}'].put.operationId).toBe('weatherIdIdPut')
    expect(infile.paths['/weather/id/{id}'].put.requestBody.description).toBe('Optional description in *Markdown*')
    expect(infile.paths['/weather/id/{id}'].put.requestBody.required).toBe(true)
    expect(infile.paths['/weather/id/{id}'].put.requestBody.content['application/json'].schema.$ref).toBe('#/components/schemas/WeatherPut')
    expect(infile.paths['/weather/id/{id}'].put.responses[200].description).toBe('Successful temp creation')
    expect(infile.paths['/weather/id/{id}'].put.responses[200].content['application/json'].schema.$ref).toBe('#/components/schemas/Weather')
    expect(infile.paths['/weather/id/{id}'].put.responses[422].description).toBe('Invalid form data provided')
    expect(infile.components.parameters.PathId.in).toBe('path')
    expect(infile.components.parameters.PathId.name).toBe('id')
    expect(infile.components.parameters.PathId.schema.type).toBe('integer')
    expect(infile.components.parameters.PathId.required).toBe(true)
    expect(infile.components.parameters.PathId.description).toBe('Numeric ID of object to fetch')
    expect(infile.components.parameters.QueryOffset.in).toBe('query')
    expect(infile.components.parameters.QueryOffset.name).toBe('offset')
    expect(infile.components.parameters.QueryOffset.required).toBe(false)
    expect(infile.components.parameters.QueryOffset.schema.type).toBe('integer')
    expect(infile.components.parameters.QueryOffset.schema.minimum).toBe(0)
    expect(infile.components.parameters.QueryOffset.description).toBe('The number of items to skip before starting to collect the result set.')
    expect(infile.components.schemas.GenericSearchMeta.properties.totalResultCount.type).toBe('number')
    expect(infile.components.schemas.GenericSearchMeta.properties.offset.type).toBe('number')
    expect(infile.components.schemas.GenericSearchMeta.properties.limit.type).toBe('number')
    expect(infile.components.schemas.Weather.type).toBe('object')
    expect(infile.components.schemas.Weather.properties.id.type).toBe('integer')
    expect(infile.components.schemas.Weather.properties.date.type).toBe('string')
    expect(infile.components.schemas.Weather.properties.date.format).toBe('date')
    expect(infile.components.schemas.Weather.properties.location.type).toBe('string')
    expect(infile.components.schemas.Weather.properties.cloudCoverPercentage.type).toBe('integer')
    expect(infile.components.schemas.Weather.properties.humidityPercentage.type).toBe('integer')
    expect(infile.components.schemas.Weather.properties.temperature.type).toBe('number')
    expect(infile.components.schemas.Weathers.type).toBe('object')
    expect(infile.components.schemas.Weathers.properties.meta.$ref).toBe('#/components/schemas/GenericSearchMeta')
    expect(infile.components.schemas.Weathers.properties.data.type).toBe('array')
    expect(infile.components.schemas.Weathers.properties.data.items.$ref).toBe('#/components/schemas/Weather')
    expect(infile.components.schemas.WeatherPost.type).toBe('object')
    expect(infile.components.schemas.WeatherPost.properties.date.type).toBe('string')
    expect(infile.components.schemas.WeatherPost.properties.date.format).toBe('date')
    expect(infile.components.schemas.WeatherPost.properties.location.type).toBe('string')
    expect(infile.components.schemas.WeatherPost.properties.cloudCoverPercentage.type).toBe('integer')
    expect(infile.components.schemas.WeatherPost.properties.humidityPercentage.type).toBe('integer')
    expect(infile.components.schemas.WeatherPost.properties.temperature.type).toBe('number')
    expect(infile.components.schemas.WeatherPut.allOf[0].$ref).toBe('#/components/schemas/WeatherPost')
    expect(infile.components.schemas.WeatherPut.allOf[1].type).toBe('object')
    expect(infile.components.schemas.WeatherPut.allOf[1].properties.id.type).toBe('integer')
  })

  it('built build/builtOA2_inject/api_1.0.1.yml', async () => {
    const infile = jsYaml.safeLoad(fs.readFileSync('build/builtOA2_inject/api_1.0.1.yml', 'utf8'))
    expect(infile.swagger).toBe('2.0');
    expect(infile.info.version).toBe('1.0.1');
    expect(infile.info.title).toBe('boats');
    expect(infile.info.description).toBe('A sample API');
    expect(infile.info.contact.name).toBe('Swagger API Team');
    expect(infile.info.contact.email).toBe('john@boats.io');
    expect(infile.info.contact.url).toBe('https://github.com/johndcarmichael/boats/');
    expect(infile.info.license.name).toBe('Apache 2.0');
    expect(infile.info.license.url).toBe('https://www.apache.org/licenses/LICENSE-2.0.html');
    expect(infile.schemes[0]).toBe('https');
    expect(infile.host).toBe('api.example.com');
    expect(infile.basePath).toBe('/v1');
    expect(infile.securityDefinitions.jwtToken.type).toBe('apiKey');
    expect(infile.securityDefinitions.jwtToken.in).toBe('header');
    expect(infile.securityDefinitions.jwtToken.name).toBe('authorization');
    expect(infile.securityDefinitions.apiKey.type).toBe('apiKey');
    expect(infile.securityDefinitions.apiKey.in).toBe('header');
    expect(infile.securityDefinitions.apiKey.name).toBe('x-api-key');
    expect(infile.paths['/weather/'].get.tags[0]).toBe('weather');
    expect(infile.paths['/weather/'].get.summary).toBe('weather search');
    expect(infile.paths['/weather/'].get.description).toBe('Search for weather objects');
    expect(infile.paths['/weather/'].get.operationId).toBe('v1WeatherGet');
    expect(infile.paths['/weather/'].get['x-filename']).toBe('get');
    expect(infile.paths['/weather/'].get.parameters[0].$ref).toBe('#/parameters/QueryOffset');
    expect(infile.paths['/weather/'].get.parameters[1].$ref).toBe('#/parameters/QueryTextSearch');
    expect(infile.paths['/weather/'].get.parameters[2].$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/'].get.responses[200].description).toBe('Successful fetch');
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.meta.$ref).toBe('#/definitions/GenericSearchMeta');
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.data.type).toBe('array');
    expect(infile.paths['/weather/'].get.responses[200].schema.properties.data.items.$ref).toBe('#/definitions/WeatherModel');
    expect(infile.paths['/weather/'].get.responses[404].description).toBe('Path & method combination not found');
    expect(infile.paths['/weather/'].get['x-template-permission']).toBe('readV1WeatherGet');
    expect(infile.paths['/weather/'].get['x-template-description']).toBe('v1WeatherGet');
    expect(infile.paths['/weather/'].get['x-template-resolution'].a.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/'].get['x-template-resolution'].b.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/'].get['x-template-resolution'].c.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/'].post.tags[0]).toBe('weather');
    expect(infile.paths['/weather/'].post.summary).toBe('weather data');
    expect(infile.paths['/weather/'].post.description).toBe('Create a new weather record.');
    expect(infile.paths['/weather/'].post.operationId).toBe('v1WeatherPost');
    expect(infile.paths['/weather/'].post.parameters[0].in).toBe('body');
    expect(infile.paths['/weather/'].post.parameters[0].name).toBe('v1WeatherPost');
    expect(infile.paths['/weather/'].post.parameters[0].description).toBe('Optional description in *Markdown*');
    expect(infile.paths['/weather/'].post.parameters[0].required).toBe(true);
    expect(infile.paths['/weather/'].post.parameters[0].schema.$ref).toBe('#/definitions/WeatherPost');
    expect(infile.paths['/weather/'].post.responses[200].description).toBe('Successful temp creation');
    expect(infile.paths['/weather/'].post.responses[200].schema.$ref).toBe('#/definitions/WeatherModel');
    expect(infile.paths['/weather/'].post.responses[422].description).toBe('Invalid form data provided');
    expect(infile.paths['/weather/'].post['x-template-permission']).toBe('modifyV1WeatherPost');
    expect(infile.paths['/weather/'].post['x-template-description']).toBe('v1WeatherPost');
    expect(infile.paths['/weather/'].post['x-template-resolution'].a.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/'].post['x-template-resolution'].b.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/'].post['x-template-resolution'].c.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/id/{id}'].get.tags[0]).toBe('weather');
    expect(infile.paths['/weather/id/{id}'].get.summary).toBe('One weather object');
    expect(infile.paths['/weather/id/{id}'].get.description).toBe('Get the full weather object');
    expect(infile.paths['/weather/id/{id}'].get.operationId).toBe('v1WeatherIdGet');
    expect(infile.paths['/weather/id/{id}'].get.produces[0]).toBe('application/json');
    expect(infile.paths['/weather/id/{id}'].get.parameters[0].$ref).toBe('#/parameters/PathId');
    expect(infile.paths['/weather/id/{id}'].get.parameters[1].$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/id/{id}'].get.responses[200].description).toBe('Successful fetch');
    expect(infile.paths['/weather/id/{id}'].get.responses[200].schema.$ref).toBe('#/definitions/WeatherModel');
    expect(infile.paths['/weather/id/{id}'].get.responses[404].description).toBe('Path & method combination not found');
    expect(infile.paths['/weather/id/{id}'].get['x-template-permission']).toBe('readV1WeatherIdGet');
    expect(infile.paths['/weather/id/{id}'].get['x-template-description']).toBe('v1WeatherIdGet');
    expect(infile.paths['/weather/id/{id}'].get['x-template-resolution'].a.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/id/{id}'].get['x-template-resolution'].b.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/id/{id}'].get['x-template-resolution'].c.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/id/{id}'].put.tags[0]).toBe('weather');
    expect(infile.paths['/weather/id/{id}'].put.summary).toBe('weather data');
    expect(infile.paths['/weather/id/{id}'].put.description).toBe('Create a new weather record.');
    expect(infile.paths['/weather/id/{id}'].put.operationId).toBe('v1WeatherIdPut');
    expect(infile.paths['/weather/id/{id}'].put.produces[0]).toBe('application/json');
    expect(infile.paths['/weather/id/{id}'].put.parameters[0].$ref).toBe('#/parameters/PathId');
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].in).toBe('body');
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].name).toBe('v1WeatherIdPut');
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].description).toBe('Optional description in *Markdown*');
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].required).toBe(true);
    expect(infile.paths['/weather/id/{id}'].put.parameters[1].schema.$ref).toBe('#/definitions/WeatherIdPut');
    expect(infile.paths['/weather/id/{id}'].put.responses[200].description).toBe('Successful temp creation');
    expect(infile.paths['/weather/id/{id}'].put.responses[200].schema.$ref).toBe('#/definitions/WeatherModel');
    expect(infile.paths['/weather/id/{id}'].put.responses[422].description).toBe('Invalid form data provided');
    expect(infile.paths['/weather/id/{id}'].put['x-template-permission']).toBe('modifyV1WeatherIdPut');
    expect(infile.paths['/weather/id/{id}'].put['x-template-description']).toBe('v1WeatherIdPut');
    expect(infile.paths['/weather/id/{id}'].put['x-template-resolution'].a.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/id/{id}'].put['x-template-resolution'].b.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/id/{id}'].put['x-template-resolution'].c.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/latest'].get.tags[0]).toBe('weather');
    expect(infile.paths['/weather/latest'].get.summary).toBe('lastest weather data');
    expect(infile.paths['/weather/latest'].get.description).toBe('Get the latest temperatures');
    expect(infile.paths['/weather/latest'].get.operationId).toBe('v1WeatherLatestGet');
    expect(infile.paths['/weather/latest'].get.produces[0]).toBe('application/json');
    expect(infile.paths['/weather/latest'].get.responses[200].description).toBe('Successful fetch');
    expect(infile.paths['/weather/latest'].get.responses[200].schema.$ref).toBe('#/definitions/WeatherModels');
    expect(infile.paths['/weather/latest'].get.responses[404].description).toBe('Temp not found');
    expect(infile.paths['/weather/latest'].get['x-template-permission']).toBe('readV1WeatherLatestGet');
    expect(infile.paths['/weather/latest'].get['x-template-description']).toBe('v1WeatherLatestGet');
    expect(infile.paths['/weather/latest'].get['x-template-resolution'].a.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/latest'].get['x-template-resolution'].b.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.paths['/weather/latest'].get['x-template-resolution'].c.$ref).toBe('#/parameters/HeaderSearchId');
    expect(infile.parameters.HeaderSearchId.in).toBe('header');
    expect(infile.parameters.HeaderSearchId.name).toBe('Search-Id');
    expect(infile.parameters.HeaderSearchId.type).toBe('string');
    expect(infile.parameters.HeaderSearchId.description).toBe('Unique search {id}');
    expect(infile.parameters.HeaderSearchId['x-example']).toBe('569eecd9-9962-4aed-a0f0-30476c6a82ed');
    expect(infile.parameters.PathId.in).toBe('path');
    expect(infile.parameters.PathId.name).toBe('id');
    expect(infile.parameters.PathId.type).toBe('integer');
    expect(infile.parameters.PathId.required).toBe(true);
    expect(infile.parameters.PathId.description).toBe('Numeric ID of object to fetch');
    expect(infile.parameters.QueryOffset.in).toBe('query');
    expect(infile.parameters.QueryOffset.name).toBe('offset');
    expect(infile.parameters.QueryOffset.required).toBe(false);
    expect(infile.parameters.QueryOffset.type).toBe('integer');
    expect(infile.parameters.QueryOffset.description).toBe('The number of items to skip before starting to collect the result set.');
    expect(infile.parameters.QueryTextSearch.in).toBe('query');
    expect(infile.parameters.QueryTextSearch.name).toBe('textSearch');
    expect(infile.parameters.QueryTextSearch.required).toBe(false);
    expect(infile.parameters.QueryTextSearch.type).toBe('string');
    expect(infile.parameters.QueryTextSearch.description).toBe('Search string to query');
    expect(infile.definitions.GenericSearchMeta.properties.totalResultCount.type).toBe('number');
    expect(infile.definitions.GenericSearchMeta.properties.offset.type).toBe('number');
    expect(infile.definitions.GenericSearchMeta.properties.limit.type).toBe('number');
    expect(infile.definitions.WeatherIdPut.allOf[0].$ref).toBe('#/definitions/WeatherPost');
    expect(infile.definitions.WeatherIdPut.allOf[1].type).toBe('object');
    expect(infile.definitions.WeatherIdPut.allOf[1].properties.id.type).toBe('integer');
    expect(infile.definitions.WeatherModel.type).toBe('object');
    expect(infile.definitions.WeatherModel.properties.id.type).toBe('integer');
    expect(infile.definitions.WeatherModel.properties.date.type).toBe('string');
    expect(infile.definitions.WeatherModel.properties.date.format).toBe('date');
    expect(infile.definitions.WeatherModel.properties.location.type).toBe('string');
    expect(infile.definitions.WeatherModel.properties.cloudCoverPercentage.type).toBe('integer');
    expect(infile.definitions.WeatherModel.properties.humidityPercentage.type).toBe('integer');
    expect(infile.definitions.WeatherModel.properties.temperature.type).toBe('number');
    expect(infile.definitions.WeatherModels.type).toBe('array');
    expect(infile.definitions.WeatherModels.items.$ref).toBe('#/definitions/WeatherModel');
    expect(infile.definitions.WeatherPost.type).toBe('object');
    expect(infile.definitions.WeatherPost.properties.date.type).toBe('string');
    expect(infile.definitions.WeatherPost.properties.date.format).toBe('date');
    expect(infile.definitions.WeatherPost.properties.location.type).toBe('string');
    expect(infile.definitions.WeatherPost.properties.cloudCoverPercentage.type).toBe('integer');
    expect(infile.definitions.WeatherPost.properties.humidityPercentage.type).toBe('integer');
    expect(infile.definitions.WeatherPost.properties.temperature.type).toBe('number');
  })
})
