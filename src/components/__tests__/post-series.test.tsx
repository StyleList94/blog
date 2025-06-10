import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import PostSeriesWrapper from '../post-series-wrapper';

const mockSeriesList = [
  {
    slug: 'cocktail-life-01',
    title: '칵테일 어디까지 마셔봤니? 롱 드링크 편',
  },
  {
    slug: 'cocktail-life-02',
    title: '칵테일 어디까지 마셔봤니? 쇼트 드링크 편',
  },
  {
    slug: 'cocktail-life-03',
    title: '칵테일 어디까지 마셔봤니? 플레어 편',
  },
];

describe('PostSeriesWrapper', () => {
  it('should be rendered', () => {
    render(
      <PostSeriesWrapper
        title="칵테일 탐구일지"
        list={mockSeriesList}
        currentOrder={2}
      >
        Body Shot
      </PostSeriesWrapper>,
    );

    expect(screen.getByText('S E R I E S')).toBeInTheDocument();
    expect(screen.getByText('칵테일 탐구일지')).toBeInTheDocument();

    expect(
      screen.getAllByText('칵테일 어디까지 마셔봤니? 롱 드링크 편')[0],
    ).toHaveAttribute('href', '/post/cocktail-life-01');

    expect(
      screen.getByText('칵테일 어디까지 마셔봤니? 쇼트 드링크 편'),
    ).toHaveAttribute('href', '/post/cocktail-life-02');

    expect(
      screen.getAllByText('칵테일 어디까지 마셔봤니? 플레어 편')[0],
    ).toHaveAttribute('href', '/post/cocktail-life-03');

    expect(screen.getByText('이전 시리즈 포스트')).toBeInTheDocument();
    expect(
      screen.getAllByText('칵테일 어디까지 마셔봤니? 롱 드링크 편')[1],
    ).toHaveAttribute('href', '/post/cocktail-life-01');

    expect(screen.getByText('다음 시리즈 포스트')).toBeInTheDocument();
    expect(
      screen.getAllByText('칵테일 어디까지 마셔봤니? 플레어 편')[1],
    ).toHaveAttribute('href', '/post/cocktail-life-03');
  });

  it('should be rendered last post of series', () => {
    render(
      <PostSeriesWrapper
        title="칵테일 탐구일지"
        list={mockSeriesList}
        currentOrder={3}
      >
        Body Shot
      </PostSeriesWrapper>,
    );

    expect(screen.getByText('이전 시리즈 포스트')).toBeInTheDocument();
    expect(
      screen.getAllByText('칵테일 어디까지 마셔봤니? 쇼트 드링크 편')[1],
    ).toHaveAttribute('href', '/post/cocktail-life-02');

    expect(screen.queryByText('다음 시리즈 포스트')).not.toBeInTheDocument();
  });

  it('should be rendered first post of series', () => {
    render(
      <PostSeriesWrapper
        title="칵테일 탐구일지"
        list={mockSeriesList}
        currentOrder={1}
      >
        Body Shot
      </PostSeriesWrapper>,
    );

    expect(screen.queryByText('이전 시리즈 포스트')).not.toBeInTheDocument();

    expect(screen.getByText('다음 시리즈 포스트')).toBeInTheDocument();
    expect(
      screen.getAllByText('칵테일 어디까지 마셔봤니? 쇼트 드링크 편')[1],
    ).toHaveAttribute('href', '/post/cocktail-life-02');
  });
});
