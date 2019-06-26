import { setEnvironment } from './common/configs/environment/environment.env';
setEnvironment();

import { PORT, ENV } from './common/configs/environment/api.env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const pacote = require( '../package.json' ); // dados do projeto

async function bootstrap () {
  const app = await NestFactory.create( AppModule );
  app.enableCors();

  let options; // seleciona o schema http fora de prod e https em prod
  if ( ENV == 'production' ) {
    options = new DocumentBuilder()
      .setTitle( 'Rancher Services Manager' )
      .setDescription( pacote.description )
      .setVersion( pacote.version )
      .addTag( 'Documentação das rotas disponíveis na API' )
      .setSchemes( 'https', 'http' )
      .build();
  } else {
    options = new DocumentBuilder()
      .setTitle( 'Rancher Services Manager' )
      .setDescription( pacote.description )
      .setVersion( pacote.version )
      .addTag( 'Documentação das rotas disponíveis na API' )
      .setSchemes( 'http', 'https' )
      .build();
  }
  const document = SwaggerModule.createDocument( app, options );
  SwaggerModule.setup( 'docs', app, document );
  await app.listen( PORT );
  console.log( `API pronta e ouvindo na porta ${PORT}` );
}
bootstrap();
