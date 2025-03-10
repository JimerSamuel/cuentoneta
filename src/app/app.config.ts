import {
  APP_ID,
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { ContentService } from './providers/content.service';
import { StoryService } from './providers/story.service';
import { HttpClientModule } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    ContentService,
    StoryService,
    { provide: APP_ID, useValue: 'serverApp' },
    {
      provide: APP_INITIALIZER,
      useFactory: (contentService: ContentService) => () =>
        contentService.fetchContentConfig(),
      deps: [ContentService],
      multi: true,
    },
    provideClientHydration(),
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    importProvidersFrom(HttpClientModule),
  ],
};
