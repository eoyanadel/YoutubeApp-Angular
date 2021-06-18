import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YoutubeResponse, Item, Video } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'YOUR_APIKEY_HERE';
  private playList = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor(private http: HttpClient) { }


  getVideos(): Observable<Video[]> {

    const url = `${ this.youtubeUrl }/playlistItems`;

    const params = new HttpParams()
          .set('part', 'snippet')
          .set('maxResults', '10')
          .set('playlistId', this.playList)
          .set('key', this.apiKey)
          .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>(url, { params })
              .pipe(
                map(resp => {
                  this.nextPageToken = resp.nextPageToken;
                  return resp.items;
                }),
                map(items => {
                  return items.map(video => video.snippet);
                })
              );
  }
}
