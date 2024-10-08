import prettify from 'prettify-xml';
import Prism from 'prismjs';
import React from 'react';
import ReactDOM from 'react-dom/server';

export default function IndexPage() {
  return (
    <main>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col">
            <h1>Grid</h1>
          </div>
        </div>
        <div className="cds--row">
          <div className="cds--col">
            <ul>
              {sections.map(section => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {sections.map(section => (
        <section key={section.name}>
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
                <h2 id={section.id}>{section.name}</h2>
                <p>{section.description}</p>
              </div>
            </div>
          </div>
          {section.examples.map(example => (
            <article key={example.name}>
              <div className="cds--grid">
                <div className="cds--row">
                  <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
                    <h3>{example.name}</h3>
                    {example.description && <p>{example.description}</p>}
                  </div>
                </div>
              </div>
              <div className="example">
                {React.createElement(example.content)}
              </div>
              <div className="cds--grid">
                <div className="cds--row">
                  <div className="cds--col">
                    <details>
                      <summary>Code</summary>
                      <pre className="language-js">
                        <code
                          className="language-js"
                          dangerouslySetInnerHTML={{
                            __html: Prism.highlight(
                              prettify(
                                ReactDOM.renderToStaticMarkup(
                                  React.createElement(example.content)
                                )
                              ),
                              Prism.languages.javascript,
                              'javascript'
                            ),
                          }}
                        />
                      </pre>
                    </details>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      ))}
    </main>
  );
}

const sections = [
  {
    id: 'usage',
    name: 'Usage',
    description: (
      <React.Fragment>
        The flex grid format closely mirrors Bootstrap's grid. At the
        top-level, you define a container with the <code>.cds--grid</code> class.
        Inside of a grid, you have multiple rows where you use{' '}
        <code>.cds--row</code>. Inside of a row, you use our column classes (
        <code>.cds--col</code>, <code>{`.cds--col-<breakpoint>-<span>`}</code>)
      </React.Fragment>
    ),
    examples: [
      {
        name: 'Auto columns',
        content() {
          return (
            <div className="cds--grid">
              <div className="cds--row">
                <div className="cds--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="cds--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="cds--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="cds--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        name: 'Column span per breakpoint',
        description:
          'Use the column helpers to specify different column spans at different widths',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-sm-1 cds--col-md-2 cds--col-lg-4">
                <div className="outside">
                  <div className="inside">Content</div>
                </div>
              </div>
              <div className="cds--col-sm-1 cds--col-md-2 cds--col-lg-6">
                <div className="outside">
                  <div className="inside">Content</div>
                </div>
              </div>
              <div className="cds--col-sm-1 cds--col-md-2 cds--col-lg-4">
                <div className="outside">
                  <div className="inside">Content</div>
                </div>
              </div>
              <div className="cds--col-sm-1 cds--col-md-2 cds--col-lg-2">
                <div className="outside">
                  <div className="inside">Content</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'Hide column per breakpoint',
        description:
          'Use the column helpers to specify a column span of 0 at different widths',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-sm-1 cds--col-md-2 cds--col-lg-6">
                <div className="outside">
                  <div className="inside">Never Hidden</div>
                </div>
              </div>
              <div className="cds--col-sm-2 cds--col-md-0 cds--col-lg-6">
                <div className="outside">
                  <div className="inside">Hidden on Medium Screens</div>
                </div>
              </div>
              <div className="cds--col-sm-0 cds--col-md-3 cds--col-lg-4">
                <div className="outside">
                  <div className="inside">Hidden on Small Screens</div>
                </div>
              </div>
              <div className="cds--col-sm-1 cds--col-md-3 cds--col-lg-0">
                <div className="outside">
                  <div className="inside">Hidden on Large Screens</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'Include column padding',
        description:
          'Use the column padding helper to add vertical padding to a node in a column',
        content() {
          return (
            <div className="cds--grid">
              <div className="cds--row">
                <div className="cds--col cds--col-padding">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="cds--col">
                  <div className="outside cds--col-padding">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="cds--col cds--col-padding">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="cds--col cds--col-padding">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
              </div>
              <div className="cds--row cds--row-padding">
                <div className="cds--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="cds--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="cds--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
                <div className="cds--col">
                  <div className="outside">
                    <div className="inside">1/4</div>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      },
    ],
  },
  {
    id: 'offset',
    name: 'Offset',
    description: 'Use offset classes to offset content by a given column span',
    examples: [
      {
        name: 'Default offset usage',
        content: () => (
          <div className="cds--grid">
            {Array.from({ length: 16 }).map((_, i) => {
              const offset = 15 - i;
              const span = 16 - offset;
              return (
                <div key={i} className="cds--row">
                  <div className={`cds--offset-lg-${offset} cds--col-lg-${span}`}>
                    <div className="outside">
                      <div className="inside">{span}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ),
      },
    ],
  },
  {
    id: 'condensed-grid',
    name: 'Condensed grid',
    description:
      'A condensed grid collapses the gutter to 1px. Useful for fluid layouts. Rows have 1px of margin between them to match gutter.',
    examples: [
      {
        name: 'Default usage',
        content: () => (
          <div className="cds--grid cds--grid--condensed">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'Mixed row content',
        description:
          'Use a helper class to specify a single row as condensed. Rows that are adjacent and are condensed will have 2px of margin between them to match gutter.',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="cds--row cds--row--condensed">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="cds--row cds--row--condensed">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  ,
  {
    id: 'narrow-grid',
    name: 'Narrow grid',
    description:
      'A narrow grid allows the container to hang 16px into the gutter on one side',
    examples: [
      {
        name: 'Default usage',
        content: () => (
          <div className="cds--grid cds--grid--narrow">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'Mixed row content',
        description:
          'Use a helper class to specify a single row as narrow.',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="cds--row cds--row--narrow">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="cds--row cds--row--narrow">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'no-gutters',
    name: 'No gutters',
    description:
      'Sometimes it is useful to have no gutters in a layout, particularly for fluid layouts. You can specify no gutters on a column-by-column basis or for all columns in a row.',
    examples: [
      {
        name: 'No gutters',
        description: 'Single column usage of cds--no-gutter',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col cds--no-gutter">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col cds--no-gutter">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col cds--no-gutter">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col cds--no-gutter">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'No gutters',
        description: 'Row usage of cds--no-gutter',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row cds--no-gutter">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'No gutters - directional',
        description:
          'You can also specify no gutters for either direction, for both columns and rows',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col cds--no-gutter--left">
                <div className="outside">
                  <div className="inside">No gutter on left side</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
            <div className="cds--row">
              <div className="cds--col cds--no-gutter--right">
                <div className="outside">
                  <div className="inside">No gutter on right side</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
            <div className="cds--row cds--no-gutter--left">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">No gutter on left side</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">No gutter on left side</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">No gutter on left side</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">No gutter on left side</div>
                </div>
              </div>
            </div>
            <div className="cds--row cds--no-gutter--right">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">No gutter on right side</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">No gutter on right side</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">No gutter on right side</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">No gutter on right side</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'hang',
    name: 'Hanging content',
    description:
      'When working with no gutters, it is helpful to keep content inside of the columns aligned with other rows in the same grid. In order to do this, we use a combination of no-gutter and hang classes.',
    examples: [
      {
        name: 'Hanging text',
        description:
          'In order to hang text, you will need to specify no gutter on the left-hand side and use hang on the inner text that you want to align',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
            <div className="cds--row cds--no-gutter--left">
              <div className="cds--col">
                <div className="image-example cds--aspect-ratio cds--aspect-ratio--1x1">
                  Full width image
                </div>
                <div className="outside cds--hang--left">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="image-example cds--aspect-ratio cds--aspect-ratio--1x1">
                  Full width image
                </div>
                <div className="outside cds--hang--left">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="image-example cds--aspect-ratio cds--aspect-ratio--1x1">
                  Full width image
                </div>
                <div className="outside cds--hang--left">
                  <div className="inside">1/4</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="image-example cds--aspect-ratio cds--aspect-ratio--1x1">
                  Full width image
                </div>
                <div className="outside cds--hang--left">
                  <div className="inside">1/4</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'aspect-ratio',
    name: 'Aspect ratio',
    description: `When designing fluid layouts, sometimes it is helpful for an asset or card to be a specific aspect ratio. We offer several classes for specifying aspect ratio for given content.`,
    examples: [
      {
        name: '2:1',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--2x1">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--2x1">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--2x1">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--2x1">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: '16:9',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--16x9">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--16x9">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--16x9">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--16x9">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: '4:3',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--4x3">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--4x3">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--4x3">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--4x3">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: '1:1',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--1x1">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--1x1">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--1x1">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--1x1">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: '3:4',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--3x4">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--3x4">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--3x4">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--3x4">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: '9:16',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--9x16">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--9x16">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--9x16">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--9x16">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: '1:2',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--1x2">
                  <div className="inside">
                    1
                  </div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--1x2">
                  <div className="inside">
                    1
                  </div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--1x2">
                  <div className="inside">
                    1
                  </div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--1x2">
                  <div className="inside">
                    1
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: '1:1 Aspect Ratio Overflow',
        content: () => (
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--2x1">
                  <div className="inside">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis aliquam tempus rutrum. Morbi consequat, mi quis
                    pharetra eleifend, ipsum arcu porta arcu, malesuada egestas
                    sapien enim ac nisi. Maecenas ipsum nibh, viverra viverra
                    feugiat quis, convallis pulvinar nisi. Fusce eget erat in
                    nulla vestibulum posuere id eu augue. Aliquam eget nulla
                    volutpat, suscipit leo quis, vulputate risus. Cras orci
                    arcu, aliquet ac eleifend placerat, interdum id augue. Morbi
                    mollis urna sed euismod condimentum. Nulla ut mauris ex.
                    Pellentesque id volutpat arcu. In ligula est, varius at
                    facilisis eu, blandit ornare turpis. Nullam consequat
                    venenatis magna sed sodales. Nam ornare nibh augue, non
                    suscipit quam feugiat ut. Vivamus mollis libero mauris, vel
                    venenatis justo feugiat sed. Ut consectetur nunc condimentum
                    egestas vestibulum. Integer metus metus, elementum at magna
                    vel, cursus commodo urna.
                  </div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--2x1">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--2x1">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside cds--aspect-ratio cds--aspect-ratio--2x1">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'full-bleed',
    name: 'Full bleed',
    description:
      'When wanting background colors to go edge-to-edge, you can apply your desired color directly to the grid',
    examples: [
      {
        name: 'Usage',
        description:
          'In this example, we give the grid element the class name "bleed" which we then style with a background color.',
        content: () => (
          <div className="cds--grid bleed">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'full-width',
    name: 'Full width',
    description:
      'By default, the grid has a max width set. You can remove this by using a grid modifier class.',
    examples: [
      {
        name: 'Usage',
        content: () => (
          <div className="cds--grid cds--grid--full-width">
            <div className="cds--row">
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
              <div className="cds--col">
                <div className="outside">
                  <div className="inside">1</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
];
